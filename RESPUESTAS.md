# Respuestas de Reflexión — Empaquetando PWA como app Android con Bubblewrap

### 1. ¿Qué diferencia notaste, si notaste alguna, entre abrir tu PWA desde el navegador del celular y abrirla como la app instalada con Bubblewrap?
**Respuesta:**
Cuando se abre la PWA desde el navegador, permanece visible la interfaz de este (barra de direcciones, pestañas y controles del navegador). En cambio, al instalar la app empaquetada con **Bubblewrap (TWA - Trusted Web Activity)**, la aplicación se ejecuta de forma **fullscreen / standalone**, integrándose completamente con el sistema operativo Android como si fuera una aplicación nativa, sin barra de direcciones ni controles del navegador, y apareciendo en el cajón de aplicaciones con su propio ícono.

---

### 2. Si mañana corregís un error visual en tu página de Next.js y volvés a desplegarla en Vercel, ¿hace falta generar de nuevo el paquete con Bubblewrap e instalarlo otra vez? Justificá tu respuesta con lo que viste en la guía teórica.
**Respuesta:**
**No, no hace falta** volver a generar el paquete APK/AAB ni reinstalar la app en el dispositivo. 
Una TWA (*Trusted Web Activity*) es esencialmente un contenedor nativo liviano que renderiza la web hospedada en tu servidor HTTPS mediante una pestaña personalizada de Chrome (*Custom Tab*). Por lo tanto, cualquier actualización de código frontend, diseño CSS o lógica JS desplegada en Vercel se reflejará **automáticamente** e inmediatamente cuando los usuarios abran la aplicación, ya que el contenido se sirve directamente desde la web. 

*(Solo se requeriría recompilar el paquete si cambias metadatos nativos del sistema, como el ID de paquete Android, el ícono nativo de la app o el esquema de URLs/domain).*

---

### 3. ¿Qué pasaría si alguien copiara tu `manifest.json` y lo usara para generar su propia TWA apuntando a tu mismo sitio, sin tu autorización? ¿Los Digital Asset Links se lo permitirían?
**Respuesta:**
**No se lo permitirían sin mostrar la barra de navegador.**
Los **Digital Asset Links** (`assetlinks.json`) establecen una relación de confianza estricta y bidireccional entre el dominio web (`https://tu-dominio.vercel.app/.well-known/assetlinks.json`) y el paquete de la aplicación Android. 

El archivo `assetlinks.json` en tu servidor web contiene explícitamente:
1. El `package_name` oficial de la app.
2. La huella digital criptográfica (`sha256_cert_fingerprints`) del certificado de firma (keystore) con el que compilaste el APK.

Si un tercero intenta crear una TWA apuntando a tu URL, su APK estará firmado con **su propio keystore** (tendrá una huella SHA-256 distinta) y/o tendrá otro `package_name`. Como la huella de su APK no coincidirá con la huella autorizada en tu servidor web en `assetlinks.json`, el sistema Android detectará el fallo de verificación y **forzará la aparición de la barra de direcciones del navegador** (tratará la app como una navegación web estándar no verificada), impidiendo que se haga pasar por una app nativa autorizada de tu sitio.
