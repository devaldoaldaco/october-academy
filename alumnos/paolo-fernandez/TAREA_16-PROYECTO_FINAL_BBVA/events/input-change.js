export const emitInputChange = (id, value, ctx) => {
  ctx.dispatchEvent(new CustomEvent('input-change', {
    detail: { id, value },
    bubbles: true,
    composed: true
  }));
}