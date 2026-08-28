// Contato compartilhado entre header, rodapé, botão flutuante e as CTAs das
// rotas internas.
//
// O número e a mensagem do WhatsApp vivem aqui porque o mesmo link aparece em
// seis componentes. Enquanto a URL estava escrita à mão em cada um, trocar o
// número significava caçar string por string, e bastava esquecer um arquivo para
// o site ficar com dois telefones diferentes no ar.
export const WHATSAPP_NUMERO = '5547992006498'

/** Texto que já chega digitado na conversa, para a equipe saber de onde veio o
 *  contato antes da primeira resposta. */
export const WHATSAPP_MENSAGEM = 'Oi, eu vim pelo site da ARCK1PRO'

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
  WHATSAPP_MENSAGEM,
)}`
