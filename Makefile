# Comandos
dev:
	skaffold dev

port80:
	sudo kubectl port-forward --namespace=ingress-nginx service/ingress-nginx-controller 80:80

down:
	skaffold dev

unrootify:
	sudo chown -R $$(id -u):$$(id -g) .
