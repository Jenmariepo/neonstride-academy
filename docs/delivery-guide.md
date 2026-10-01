# Cierre de la entrega académica

## Estado actual

El repositorio Git local está inicializado en la carpeta del proyecto, en la rama `main`. El ZIP contiene las fuentes, no el directorio `.git`: si trabajan desde el ZIP extraído, ejecuten `git init -b main` antes de empezar.

El documento `technical-document.pdf` tiene cuatro páginas y se ha revisado visualmente. Incluye los nombres de Diego Heredia y Jenmarie Polanco, la asignatura, el docente Carlos Escalante y el Politécnico San Valero. El contenido editable y los diagramas Mermaid permanecen en `technical-document.md`.

## Datos académicos incorporados

- Diego Heredia y Jenmarie Polanco.
- Desarrollo e implementación de soluciones web y multimedia.
- Docente Carlos Escalante, Politécnico San Valero.

## Datos que faltan

- Repositorio remoto y quién lo administrará.
- Proveedor de despliegue y disponibilidad de almacenamiento persistente para SQLite.

No envíen contraseñas ni tokens por el chat. Si es necesaria una autenticación, háganla directamente en el proveedor.

## Revisión visual y capturas

La automatización de Chrome está bloqueada en el entorno del asistente. Ejecuten la prueba desde una terminal propia, en la raíz del proyecto:

```powershell
npm ci
npm start
```

Mantengan ese servidor abierto. En una segunda terminal, dentro de la misma carpeta:

```powershell
npm run test:browser
```

Necesitan Google Chrome instalado. Si usan un servidor en otro puerto, indiquen su URL antes de la prueba:

```powershell
$env:TEST_URL="http://localhost:3187"
npm run test:browser
```

El script genera capturas reales en `docs/screenshots/`. Utiliza el perfil de prueba «Piloto QA»; ejecútenlo en una base de demostración, no sobre la clasificación pública final. No borren la base de producción para limpiar pruebas.

Revisen menú, partida, recuperación y resultados en escritorio; verifiquen los anchos de 375 y 768 píxeles. La emulación de ancho no sustituye probar toques en un teléfono real. Escuchen los efectos, desactívenlos y comprueben que el audio deja de sonar. Verifiquen también reducción de movimiento, teclado y ausencia de desplazamiento horizontal.

Si la prueba falla, conserven la salida de la terminal y las capturas generadas para corregir la causa antes de marcar la revisión como completada.

## Trabajo real y commits

Cada integrante debe configurar su identidad en su propia copia y realizar cambios que pueda explicar. No se han fabricado commits de ninguno de los dos. `docs/team-work.md` propone una división de responsabilidades; el reparto no constituye evidencia de trabajo realizado.

Antes de cada commit:

```sh
npm run check
git status
git diff
```

Revisen los archivos que van a incluir y añádanlos de forma explícita. No incluyan `.env`, tokens, bases de datos, `node_modules` ni archivos ajenos al proyecto. Publiquen el remoto cuando se haya definido la cuenta y la visibilidad del repositorio.

## Publicación y video

Sigan `deployment.md` una vez elegido el proveedor. SQLite requiere disco o volumen persistente. Verifiquen que una partida siga existiendo después de reiniciar el backend.

El guion detallado está en `presentation-script.md`. Cada integrante debe grabar su parte real y explicar también las decisiones del otro. La publicación, el video y la defensa no están marcados como terminados.
