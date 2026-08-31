#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const newsRoot = path.join(projectRoot, "public", "news");
const articleRoot = path.join(newsRoot, "articles");
const indexPath = path.join(newsRoot, "index.json");

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isIsoDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00Z`);
  return (
    !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
}

function validateNewsItems(items) {
  const errors = [];
  const slugs = new Set();

  if (!Array.isArray(items)) {
    return ["public/news/index.json 的顶层结构必须是数组"];
  }

  items.forEach((item, index) => {
    const location = `第 ${index + 1} 条新闻`;

    if (item === null || typeof item !== "object" || Array.isArray(item)) {
      errors.push(`${location}必须是对象`);
      return;
    }

    const validSlug =
      isNonEmptyString(item.slug) &&
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug);

    if (!validSlug) {
      errors.push(`${location}的 slug 只能包含小写字母、数字和连字符`);
    } else if (slugs.has(item.slug)) {
      errors.push(`${location}的 slug 与其他新闻重复: ${item.slug}`);
    } else {
      slugs.add(item.slug);
    }

    if (!isNonEmptyString(item.title)) {
      errors.push(`${location}缺少 title`);
    }
    if (!isNonEmptyString(item.summary)) {
      errors.push(`${location}缺少 summary`);
    }
    if (!isNonEmptyString(item.author)) {
      errors.push(`${location}缺少 author`);
    }
    if (!isNonEmptyString(item.publishedAt) || !isIsoDate(item.publishedAt)) {
      errors.push(`${location}的 publishedAt 必须是有效的 YYYY-MM-DD 日期`);
    }
    if (
      !Array.isArray(item.tags) ||
      item.tags.some((tag) => !isNonEmptyString(tag))
    ) {
      errors.push(`${location}的 tags 必须是字符串数组`);
    }
    if (item.pinned !== undefined && typeof item.pinned !== "boolean") {
      errors.push(`${location}的 pinned 必须是布尔值`);
    }
    if (item.draft !== undefined && typeof item.draft !== "boolean") {
      errors.push(`${location}的 draft 必须是布尔值`);
    }

    if (validSlug) {
      const articlePath = path.join(articleRoot, `${item.slug}.md`);
      if (!fs.existsSync(articlePath) || !fs.statSync(articlePath).isFile()) {
        errors.push(
          `${location}缺少正文文件: public/news/articles/${item.slug}.md`,
        );
      } else if (fs.readFileSync(articlePath, "utf8").trim().length === 0) {
        errors.push(`${location}的正文文件不能为空`);
      }
    }
  });

  if (fs.existsSync(articleRoot)) {
    for (const fileName of fs.readdirSync(articleRoot)) {
      if (fileName.endsWith(".md") && !slugs.has(fileName.slice(0, -3))) {
        errors.push(
          `正文文件没有对应的索引记录: public/news/articles/${fileName}`,
        );
      }
    }
  }

  return errors;
}

function main() {
  let items;
  try {
    items = JSON.parse(fs.readFileSync(indexPath, "utf8"));
  } catch (error) {
    console.error(`无法读取新闻索引 ${indexPath}: ${error.message}`);
    process.exitCode = 1;
    return;
  }

  const errors = validateNewsItems(items);
  if (errors.length > 0) {
    console.error("新闻内容校验失败:");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(`Validated ${items.length} news item(s).`);
}

if (require.main === module) {
  main();
}

module.exports = { isIsoDate, validateNewsItems };
