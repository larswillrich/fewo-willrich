# fewo-willrich

## Deployment über den Hostinger-MCP-Server

Diese Anwendung läuft auf dem Hostinger-VPS `srv1248025.hstgr.cloud` (VM-ID `1248025`) als Docker-Compose-Projekt **`fewo-willrich`**.
Deployt wird ab jetzt über den **Hostinger-MCP-Server** (Claude-Code-Plugin `hostinger`), nicht mehr über die Hostinger-Weboberfläche.

**Bei jeder Änderung in diesem Repository gilt diese Reihenfolge:**

1. **Bauen und pushen (Multi-Plattform).** Änderungen committen und auf `master` pushen. Der GitHub-Workflow `.github/workflows/docker-build.yml` baut das Image `ghcr.io/larswillrich/fewo-willrich` für `linux/amd64` und `linux/arm64` und pusht sie nach GHCR (`:latest` plus Commit-Tag).
2. **Auf den fertigen Build warten.** Erst deployen, wenn der Workflow-Lauf erfolgreich abgeschlossen ist und damit alle Images gepusht sind: `gh run list --workflow docker-build.yml --limit 1` zeigt den Lauf, `gh run watch <run-id> --exit-status` wartet auf das Ende. Schlägt der Lauf fehl, wird **nicht** deployt.
3. **Deployen.** Über den MCP-Server die Operation `vps_docker_update` mit `virtualMachineId: 1248025` und `projectName: "fewo-willrich"` ausführen. Sie zieht die neuen `:latest`-Images und erstellt die Container neu; Daten-Volumes bleiben erhalten.
4. **Prüfen.** Mit `vps_docker_list` bzw. `vps_docker_containers` kontrollieren, dass die Container wieder laufen, bei Problemen `vps_docker_logs` lesen, und die Seite im Browser aufrufen.
