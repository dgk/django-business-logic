default: build

DOCKER_IMAGE ?= dgksu/django-business-logic
DOCKER_TAG ?= demo

.PHONY:build
build:
	@docker build \
	  --build-arg VCS_REF=`git rev-parse --short HEAD` \
	  --build-arg BUILD_DATE=`date -u +"%Y-%m-%dT%H:%M:%SZ"` \
	  --build-arg VERSION=`python -c 'from __future__ import print_function; import business_logic; print(business_logic.__version__)'` \
	  -t $(DOCKER_IMAGE):$(DOCKER_TAG) .


.PHONY:push
push:
	@docker push $(DOCKER_IMAGE):$(DOCKER_TAG)
