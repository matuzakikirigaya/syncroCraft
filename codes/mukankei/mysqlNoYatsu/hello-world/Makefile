
PROJECT = hello_project

.PHONY: start
start:
	docker-compose -p $(PROJECT) up -d --build

.PHONY: logs
logs:
	docker-compose -p $(PROJECT) logs

.PHONY: restart
restart:
	docker-compose -p $(PROJECT) kill && \
	docker-compose -p $(PROJECT) rm -f && \
	docker-compose -p $(PROJECT) up -d --build

.PHONY: kill
kill:
	docker-compose -p $(PROJECT) kill

.PHONY: ps
ps:
	docker-compose -p $(PROJECT) ps