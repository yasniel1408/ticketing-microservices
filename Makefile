# Comandos
up-dev:
	skaffold dev --filename='skaffold-dev.yaml' --sync-remote-cache='always'

up-prod:
	skaffold run --filename='skaffold-prod.yaml'

port80:
	sudo kubectl port-forward --namespace=ingress-nginx service/ingress-nginx-controller 80:80

down-dev:
	skaffold delete --filename='skaffold-dev.yaml'

down-prod:
	skaffold delete --filename='skaffold-prod.yaml'

update-common:
	cd common && npm run pub;

update-services:
	cd auth && npm install @common-ticketing-microservices/common@latest;
	cd ..;
	cd tickets && npm install @common-ticketing-microservices/common@latest;
	cd ..;
	cd orders && npm install @common-ticketing-microservices/common@latest;
	cd ..;
	cd expiration && npm install @common-ticketing-microservices/common@latest;
	cd ..;

update-common-and-services:
	make update-common;
	make update-services;

unrootify:
	sudo chown -R $$(id -u):$$(id -g) .
