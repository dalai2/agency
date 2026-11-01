"""Genera brief-cliente.pdf: formulario rellenable que el cliente llena y devuelve.

Uso: python docs/brief-cliente/generar_brief.py
"""
from pathlib import Path

from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

AQUI = Path(__file__).resolve().parent
LOGO = AQUI.parent.parent / "public" / "logo.png"
SALIDA = AQUI / "brief-cliente.pdf"

AZUL = HexColor("#2E4354")
GRIS = HexColor("#5C6B77")
LINEA = HexColor("#B9CCD1")
FONDO = HexColor("#F2F6F7")
W, H = letter
M = 48
ANCHO = W - 2 * M

c = canvas.Canvas(str(SALIDA), pagesize=letter)
c.setTitle("Brief de tu sitio web - VELANT")
c.setAuthor("VELANT Agencia Digital")
form = c.acroForm
n_campo = 0


def nombre():
    global n_campo
    n_campo += 1
    return f"campo_{n_campo}"


def encabezado(pagina):
    c.setFillColor(AZUL)
    c.rect(0, H - 70, W, 70, stroke=0, fill=1)
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 20)
    c.drawString(M, H - 44, "Brief de tu sitio web")
    c.setFont("Helvetica", 9)
    c.drawRightString(W - M, H - 38, "VELANT Agencia Digital")
    c.drawRightString(W - M, H - 51, f"agenciavelant.mx  ·  Página {pagina} de 2")


def seccion(y, titulo):
    c.setFillColor(AZUL)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(M, y, titulo.upper())
    c.setStrokeColor(AZUL)
    c.setLineWidth(1.2)
    c.line(M, y - 5, W - M, y - 5)
    return y - 24


def etiqueta(y, texto, ayuda=None):
    c.setFillColor(AZUL)
    c.setFont("Helvetica-Bold", 9.5)
    c.drawString(M, y, texto)
    if ayuda:
        c.setFillColor(GRIS)
        c.setFont("Helvetica", 8.5)
        c.drawString(M + c.stringWidth(texto, "Helvetica-Bold", 9.5) + 6, y, ayuda)


def campo(y, texto, ayuda=None, alto=20, x=M, ancho=ANCHO, multilinea=False):
    """Dibuja etiqueta + caja de texto. Devuelve la y donde queda libre el siguiente bloque."""
    etiqueta(y, texto, ayuda)
    form.textfield(
        name=nombre(), x=x, y=y - 8 - alto, width=ancho, height=alto,
        borderStyle="solid", borderColor=LINEA, fillColor=FONDO, textColor=AZUL,
        borderWidth=1, fontName="Helvetica", fontSize=10,
        fieldFlags="multiline" if multilinea else "",
    )
    return y - alto - 24


def dos_campos(y, a, b):
    mitad = (ANCHO - 14) / 2
    etiqueta_a = a[0]
    c.setFillColor(AZUL)
    c.setFont("Helvetica-Bold", 9.5)
    c.drawString(M, y, etiqueta_a)
    c.drawString(M + mitad + 14, y, b[0])
    for x, _ in ((M, a), (M + mitad + 14, b)):
        form.textfield(
            name=nombre(), x=x, y=y - 28, width=mitad, height=20,
            borderStyle="solid", borderColor=LINEA, fillColor=FONDO, textColor=AZUL,
            borderWidth=1, fontName="Helvetica", fontSize=10,
        )
    return y - 48


def opciones(y, texto, items, por_fila=3):
    etiqueta(y, texto)
    y -= 18
    col = ANCHO / por_fila
    for i, item in enumerate(items):
        x = M + (i % por_fila) * col
        fila_y = y - (i // por_fila) * 18
        form.checkbox(
            name=nombre(), x=x, y=fila_y - 3, size=12, borderColor=LINEA,
            fillColor=FONDO, textColor=AZUL, borderWidth=1, buttonStyle="check",
            forceBorder=True,
        )
        c.setFillColor(AZUL)
        c.setFont("Helvetica", 9.5)
        c.drawString(x + 18, fila_y, item)
    filas = (len(items) + por_fila - 1) // por_fila
    return y - filas * 18 - 10


# ---------------------------------------------------------------- página 1
encabezado(1)
y = H - 96
c.setFillColor(AZUL)
c.setFont("Helvetica", 10)
for linea in (
    "Llénalo directamente en tu computadora o celular y devuélvenoslo por WhatsApp (228 158 0134)",
    "o por mensaje directo. Si algo no lo sabes todavía, déjalo en blanco: lo resolvemos juntos.",
):
    c.drawString(M, y, linea)
    y -= 14

y -= 6
c.setFillColor(FONDO)
c.setStrokeColor(LINEA)
c.roundRect(M, y - 52, ANCHO, 56, 5, stroke=1, fill=1)
c.setFillColor(AZUL)
c.setFont("Helvetica-Bold", 9.5)
c.drawString(M + 12, y - 12, "La promo incluye")
c.setFont("Helvetica", 9.5)
c.drawString(M + 12, y - 26, "1 página, diseño responsive, formulario de contacto y el primer mes de hosting. Dominio no incluido.")
c.drawString(M + 12, y - 40, "Cualquier cambio fuera de eso se cotiza ANTES de empezar; nunca se cobra algo que no aceptaste.")
y -= 78

y = seccion(y, "1. Tu negocio")
y = dos_campos(y, ("Nombre del negocio", None), ("Tu nombre", None))
y = campo(y, "¿A qué se dedica tu negocio?", alto=44, multilinea=True)
y = campo(y, "¿A quién le vendes o quién es tu cliente ideal?", alto=32, multilinea=True)
y = opciones(
    y, "¿Qué quieres que haga quien visite tu página?",
    ["Escribirte por WhatsApp", "Llamarte", "Llenar el formulario", "Ir a tu local", "Comprar en línea", "Otro"],
)

y = seccion(y, "2. Contenido de la página")
y = campo(y, "Servicios o productos que irán en la página", "(con precios si quieres mostrarlos)", alto=56, multilinea=True)
y = opciones(y, "Textos", ["Ya los tengo escritos", "Quiero que ustedes los redacten", "Solo tengo ideas"], por_fila=3)
y = opciones(y, "Logo y fotos", ["Tengo logo", "No tengo logo", "Tengo fotos", "No tengo fotos"], por_fila=4)
c.setFillColor(GRIS)
c.setFont("Helvetica-Oblique", 8.5)
c.drawString(M, y + 2, "Los archivos (logo y fotos) mándalos por WhatsApp junto con este PDF.")

c.showPage()

# ---------------------------------------------------------------- página 2
encabezado(2)
y = H - 100

y = seccion(y, "3. Diseño")
y = campo(y, "¿Tienes un sitio o diseño de referencia?", "(enlace o \"lo mando por WhatsApp\")", alto=32, multilinea=True)
y = opciones(y, "Estilo", ["Moderno y limpio", "Elegante", "Colorido y alegre", "Sobrio y profesional", "Minimalista", "No sé, propongan"], por_fila=3)
y = campo(y, "Colores que quieres usar o evitar", alto=20)
y = opciones(y, "Cambios especiales", ["Quiero que se vea tal cual la plantilla", "Quiero cambios fuera de la plantilla"], por_fila=1)
y = campo(y, "Si quieres cambios especiales, descríbelos", "(así te decimos si la promo se respeta o cuánto cambia)", alto=56, multilinea=True)

y = seccion(y, "4. Datos técnicos")
y = opciones(y, "Dominio (la dirección web)", ["Ya tengo dominio", "Quiero que lo compren por mí", "Aún no lo decido"], por_fila=3)
y = dos_campos(y, ("Dominio (si ya lo tienes)", None), ("Correo o WhatsApp para tus avisos", None))
y = campo(y, "Redes sociales que van enlazadas en la página", "(enlaces)", alto=32, multilinea=True)

y = seccion(y, "5. Para terminar")
y = dos_campos(y, ("¿Para qué fecha lo necesitas?", None), ("Mejor medio para contactarte", None))
y = campo(y, "Algo más que debamos saber", alto=44, multilinea=True)

c.setFillColor(GRIS)
c.setFont("Helvetica", 8.5)
c.drawString(M, 46, "Al recibir este brief te confirmamos alcance y fecha de entrega por mensaje, antes de empezar el trabajo.")
c.drawString(M, 34, "Tus datos se usan solo para hacer tu sitio.")

if LOGO.exists():
    c.drawImage(str(LOGO), W - M - 30, 30, width=25, height=30, mask="auto", preserveAspectRatio=True)

c.save()
print("listo:", SALIDA)
