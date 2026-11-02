import * as tiendaMuseo from './html/tienda-museo';
import * as tiendaLookbook from './html/tienda-lookbook';
import * as tiendaPop from './html/tienda-pop';
import * as saludReserva from './html/salud-reserva';
import * as saludHumano from './html/salud-humano';
import * as saludPrecision from './html/salud-precision';
import * as restauranteCartel from './html/restaurante-cartel';
import * as restauranteMercado from './html/restaurante-mercado';
import * as restauranteCarta from './html/restaurante-carta';
import * as serviciosDatos from './html/servicios-datos';
import * as serviciosBrutalista from './html/servicios-brutalista';
import * as serviciosConversacional from './html/servicios-conversacional';

type Landing = { fonts: string; html: string };

const LANDINGS: Record<string, Landing> = {
  'tienda/museo': tiendaMuseo,
  'tienda/lookbook': tiendaLookbook,
  'tienda/pop': tiendaPop,
  'salud/reserva': saludReserva,
  'salud/humano': saludHumano,
  'salud/precision': saludPrecision,
  'restaurante/cartel': restauranteCartel,
  'restaurante/mercado': restauranteMercado,
  'restaurante/carta': restauranteCarta,
  'servicios/datos': serviciosDatos,
  'servicios/brutalista': serviciosBrutalista,
  'servicios/conversacional': serviciosConversacional,
};

export const getLanding = (vert: string, estilo: string): Landing | undefined => LANDINGS[`${vert}/${estilo}`];
