.PHONY: git
git:
	git add .
	git commit -m"自动提交 git 代码"
	git push
.PHONY: run
run:
	npm install