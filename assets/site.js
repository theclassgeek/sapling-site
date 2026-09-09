(() => {
  const calculator = document.querySelector("#future-calculator");

  if (!calculator) return;

  const ageInput = calculator.querySelector("#calculator-age");
  const giftInput = calculator.querySelector("#calculator-gift");
  const targetInputs = calculator.querySelectorAll('input[name="target"]');
  const todayOutput = calculator.querySelector("#calculator-today");
  const futureOutput = calculator.querySelector("#calculator-future");
  const yearsOutput = calculator.querySelector("#calculator-years");
  const annualRate = Number(calculator.dataset.rate || "0.05");
  const wholePounds = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  });

  function updateProjection() {
    const age = Math.max(0, Math.min(17, Number(ageInput.value)));
    const gift = Math.max(5, Math.min(1000, Number(giftInput.value) || 25));
    const checkedTarget = calculator.querySelector('input[name="target"]:checked');
    const targetAge = Number(checkedTarget?.value || "18");
    const years = Math.max(0, targetAge - age);
    const futureValue = gift * Math.pow(1 + annualRate, years);
    const targetLabel = targetAge === 18 ? "at 18" : "around age 34";

    todayOutput.textContent = `${wholePounds.format(gift)} today`;
    futureOutput.textContent = `could be about ${wholePounds.format(futureValue)} ${targetLabel}`;
    yearsOutput.textContent = `with ${years} ${years === 1 ? "year" : "years"} to grow`;
  }

  ageInput.addEventListener("change", updateProjection);
  giftInput.addEventListener("input", updateProjection);
  targetInputs.forEach((input) => input.addEventListener("change", updateProjection));
  calculator.addEventListener("submit", (event) => event.preventDefault());
  updateProjection();
})();
