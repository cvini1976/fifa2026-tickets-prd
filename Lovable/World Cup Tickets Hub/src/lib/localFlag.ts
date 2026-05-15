/**
 * Story 0.11 — Self-host de bandeiras.
 *
 * Reescreve URLs de bandeira do flagcdn.com (`flagcdn.com/w{N}/{cc}.png`)
 * para assets locais (`/flags/{cc}.png`), servidos do mesmo domínio da app.
 *
 * Motivo: `<img>` de domínio externo + `html2canvas` pode "tingir" (taint)
 * o canvas e abortar a geração do PDF do ingresso se o CDN falhar CORS
 * ou ficar indisponível durante o evento (risco residual do AC-8 / Story 0.10).
 *
 * Defensivo: entrada vazia → ''; não-flagcdn, já-local ou emoji → inalterada.
 */
export function localFlag(url?: string | null): string {
  if (!url) return '';
  const m = url.match(/flagcdn\.com\/w\d+\/([a-z]{2})\.png/i);
  return m ? `/flags/${m[1].toLowerCase()}.png` : url;
}
