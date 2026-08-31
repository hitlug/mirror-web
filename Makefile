.DEFAULT_GOAL := build

YARN_VERSION ?= 1.22.22
YARN := npx --yes yarn@$(YARN_VERSION)
YARN_CACHE_FOLDER ?= .yarn-cache
DIST_DIR ?= dist

REACT_APP_SITE_TITLE ?= 哈尔滨工业大学开源镜像站
REACT_APP_ORG_NAME ?= 哈尔滨工业大学Linux用户协会
REACT_APP_ORG_LINK ?= https://github.com/hitlug
REACT_APP_SPONSOR_NAME ?= 哈尔滨工业大学网络与信息中心

.PHONY: install build clean

install:
	$(YARN) install \
		--frozen-lockfile \
		--non-interactive \
		--cache-folder "$(YARN_CACHE_FOLDER)"

build: install
	CI=true \
	BUILD_PATH="$(DIST_DIR)" \
	GENERATE_SOURCEMAP=false \
	REACT_APP_SITE_TITLE="$(REACT_APP_SITE_TITLE)" \
	REACT_APP_ORG_NAME="$(REACT_APP_ORG_NAME)" \
	REACT_APP_ORG_LINK="$(REACT_APP_ORG_LINK)" \
	REACT_APP_SPONSOR_NAME="$(REACT_APP_SPONSOR_NAME)" \
	$(YARN) build

clean:
	test -n "$(DIST_DIR)" && test "$(DIST_DIR)" != "/" && test "$(DIST_DIR)" != "."
	rm -rf -- "$(DIST_DIR)"
