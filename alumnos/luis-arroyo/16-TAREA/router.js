export const Router = {
  navigate(view) {
    window.dispatchEvent(
      new CustomEvent("navigate", {
        detail: { view },
      })
    );
  },
};