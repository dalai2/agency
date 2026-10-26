# Prompt para abrir el proyecto "gatitos + afiliados de Mercado Libre"

Copia el bloque de abajo como primer mensaje en una sesión nueva (carpeta nueva, p. ej. `~/Documents/projects/gatitos-afiliados`).

```text
Quiero montar un proyecto NUEVO, independiente de Velant: videos cortos de gatitos hechos con IA para mi cuenta PERSONAL de TikTok, monetizados con mi cuenta de afiliado de Mercado Libre México (que nunca he aprovechado). Empieza con un brainstorm conmigo antes de producir nada.

## Objetivo
Ganar comisiones de afiliado con contenido de gatitos que muestre productos de Mercado Libre de forma natural (juguetes, rascadores, arena, camas, comederos, accesorios para gatos), con producción semiautomática: yo reviso, tú generas.

## Lo que ya tengo
- ComfyUI corriendo en http://127.0.0.1:8000 (RTX 4060 de 8 GB, 34 GB de RAM). Modelos: Wan 2.2 TI2V-5B (fp8) y I2V 14B, LTX-2.3, SDXL (RealVisXL V5 funciona muy bien para gatitos), Flux 2 Klein, y TTS (Qwen3-TTS, F5, IndexTTS). Música: ACE-Step 1.5 turbo (script en reels/musica/musica.py; pesos descargados en models/, falta confirmar que ya genera audio).
- ffmpeg instalado. Python 3.11 con numpy y Pillow.
- Un pipeline ya probado en otro proyecto (ver C:\Users\dalai\Documents\projects\agency\reels\): `comfy.py` (cliente de la API de ComfyUI), `gatito/01_imagen.py` (imagen inicial con SDXL), `gatito/02_animar.py` (animación Wan 5B, 576x1024, 121 frames a 24 fps, tarda ~8 min por clip), `gatito/03_texto.py` (composición 1080x1920 con texto y ffmpeg) y `gatito/sfx.py` (efectos de sonido sintetizados con numpy). Cópialos o adáptalos; no los modifiques allá.
- Dos reels de prueba de gatitos ya hechos para otro proyecto: sirven de referencia visual y de formato.

## Hechos verificados (no los des por supuestos distintos)
- Programa de afiliados de Mercado Libre México: comisiones de hasta 14% según campaña; pide ser mayor de 18 años y cuenta de Mercado Pago; cada solicitud la revisa Mercado Libre; sin mínimo de seguidores para entrar, pero algunos beneficios piden más de 10 mil seguidores en TikTok o Instagram. Fuente: https://www.mercadolibre.com.mx/l/afiliados . Las reglas específicas de TikTok y las comisiones por categoría NO las he verificado: confírmalas en la Central de Afiliados antes de planear.
- API de publicación de TikTok: un cliente sin auditar solo publica en privado (SELF_ONLY) y con cuenta privada; hace falta una auditoría de TikTok para publicar en público. Por eso NO construyas automatización de publicación en TikTok: la publicación es manual (o con el programador de TikTok) y el valor del proyecto es la producción por lotes.

## Restricciones y reglas
- Cuenta personal de TikTok con 0 seguidores: el objetivo inicial es crecer con el formato, no vender de inmediato.
- Transparencia: todo video con enlace de afiliado debe avisarlo, y el contenido generado con IA debe etiquetarse como tal según las reglas de TikTok. No inventes reseñas, resultados ni afirmaciones sobre los productos; no muestres productos que no existan en Mercado Libre.
- No compres con mi propio enlace de afiliado (puede anular la comisión).
- No descargues archivos grandes ni modelos sin pedirme permiso.
- Los enlaces en la descripción de TikTok no son clicables: asume enlace en la bio; confírmalo.

## Primer paso (no produzcas todavía)
1. Haz brainstorm de 6–8 formatos de serie con gancho en el primer segundo (gatito + producto), eligiendo categorías de producto con buena comisión y bajo riesgo de devolución. Para cada uno: gancho, producto tipo, texto en pantalla, sonido.
2. Propón un flujo semanal por lotes (domingo): elegir productos y enlaces, generar imágenes y clips, componer, y dejarme una carpeta con los videos y las descripciones listos para subir.
3. Dime qué información necesitas de mí (acceso a la cuenta de afiliados, categorías que me interesan, presupuesto de tiempo) y qué tendría que verificar en la Central de Afiliados.
Después elegimos UN formato y generas un video de prueba.
```
