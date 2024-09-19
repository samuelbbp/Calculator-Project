class Calculator {
  constructor() {
    this.displayTop = document.querySelector("#screen-top");
    this.displayBottom = document.querySelector("#screen-bottom");
    this.currentValue = "0";
    this.storedValue = null;
    this.currentOperator = null;
    this.isNewInput = true;
    this.hasCalculated = false;

    this.initEventListeners();
  }

  initEventListeners() {
    document
      .querySelectorAll(".number")
      .forEach((btn) =>
        btn.addEventListener("click", this.handleNumber.bind(this))
      );
    document
      .querySelectorAll(".operator")
      .forEach((btn) =>
        btn.addEventListener("click", this.handleOperator.bind(this))
      );
    document
      .querySelector("#equals-btn")
      .addEventListener("click", this.calculateResult.bind(this));
    document
      .querySelector("#clear-all")
      .addEventListener("click", this.clearAll.bind(this));
    document
      .querySelector("#clear-entry")
      .addEventListener("click", this.clearEntry.bind(this));
    document
      .querySelector("#undo")
      .addEventListener("click", this.undo.bind(this));
    document
      .querySelector("#change-sign")
      .addEventListener("click", this.changeSign.bind(this));
  }

  updateDisplay() {
    this.displayBottom.textContent = this.formatNumber(this.currentValue);
  }

  formatNumber(num) {
    const parsedNum = parseFloat(num);
    return Number.isInteger(parsedNum)
      ? parsedNum.toString()
      : parsedNum.toFixed(2);
  }

  handleNumber(event) {
    const digit = event.target.textContent;
    if (this.isNewInput) {
      this.currentValue = digit === "." ? "0." : digit;
      this.isNewInput = false;
    } else {
      if (digit === "." && this.currentValue.includes(".")) return;
      if (this.currentValue.replace("-", "").length >= 8) return;
      this.currentValue += digit;
    }
    this.updateDisplay();
  }

  handleOperator(event) {
    const newOperator = event.target.textContent;
    if (this.storedValue !== null && !this.isNewInput) {
      this.calculateResult();
    }
    this.currentOperator = newOperator;
    this.storedValue = parseFloat(this.currentValue);
    this.isNewInput = true;
    this.displayTop.textContent = `${this.formatNumber(this.storedValue)} ${
      this.currentOperator
    }`;
  }

  calculateResult() {
    if (this.currentOperator === null || this.isNewInput) return;

    const current = parseFloat(this.currentValue);
    let result;

    switch (this.currentOperator) {
      case "+":
        result = this.storedValue + current;
        break;
      case "-":
        result = this.storedValue - current;
        break;
      case "x":
        result = this.storedValue * current;
        break;
      case "/":
        result = this.storedValue / current;
        break;
    }

    this.displayTop.textContent = `${this.formatNumber(this.storedValue)} ${
      this.currentOperator
    } ${this.formatNumber(current)} =`;
    this.currentValue = this.formatNumber(result);
    this.updateDisplay();
    this.storedValue = result;
    this.isNewInput = true;
    this.hasCalculated = true;
  }

  clearAll() {
    this.currentValue = "0";
    this.storedValue = null;
    this.currentOperator = null;
    this.isNewInput = true;
    this.hasCalculated = false;
    this.displayTop.textContent = "";
    this.updateDisplay();
  }

  clearEntry() {
    this.currentValue = "0";
    this.isNewInput = true;
    this.updateDisplay();
  }

  undo() {
    if (this.hasCalculated) {
      this.displayTop.textContent = "";
      this.hasCalculated = false;
    } else {
      this.currentValue = this.currentValue.slice(0, -1) || "0";
      this.updateDisplay();
    }
  }

  changeSign() {
    if (this.currentValue !== "0") {
      this.currentValue = this.currentValue.startsWith("-")
        ? this.currentValue.slice(1)
        : "-" + this.currentValue;
      this.updateDisplay();
    }
  }
}

const calc = new Calculator();
