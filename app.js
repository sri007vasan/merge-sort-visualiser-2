(() => {
const arrayInput = document.getElementById('array-input');
const generateBtn = document.getElementById('generate-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const stepCounter = document.getElementById('step-counter');
const arrayDisplay = document.getElementById('array-display');
const explanation = document.getElementById('explanation');

let originalArray = [];
let steps = [];
let currentStep = 0;

// Utility to render array boxes
function renderArray(arr, container) {
  container.innerHTML = '';
  arr.forEach(num => {
    const div = document.createElement('div');
    div.className = 'array-box';
    div.textContent = num;
    container.appendChild(div);
  });
}

// Generate steps for a simple merge sort (split then merge)
function generateSteps(arr) {
  const steps = [];
  // Step 0: original
  steps.push({
    type: 'original',
    array: arr.slice(),
    explanation: `Original array: [${arr.join(', ')}]`
  });
  // Splitting phase
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  steps.push({
    type: 'split',
    array: arr.slice(),
    explanation: `Split into [${left.join(', ')}] and [${right.join(', ')}]`
  });
  // Merge phase
  const merged = [...left, ...right].sort((a,b)=>a-b);
  steps.push({
    type: 'merge',
    array: merged,
    explanation: `Merged into [${merged.join(', ')}]`
  });
  return steps;
}

function updateUI() {
  const step = steps[currentStep];
  renderArray(step.array, arrayDisplay);
  explanation.textContent = step.explanation;
  stepCounter.textContent = `Step ${currentStep} / ${steps.length - 1}`;
  prevBtn.disabled = currentStep === 0;
  nextBtn.disabled = currentStep === steps.length - 1;
}

generateBtn.addEventListener('click', () => {
  const raw = arrayInput.value.split(',').map(s => s.trim()).filter(Boolean);
  const nums = raw.map(Number);
  if (raw.length !== nums.length || nums.some(isNaN)) {
    alert('Please enter a valid list of numbers separated by commas.');
    return;
  }
  originalArray = nums;
  steps = generateSteps(originalArray);
  currentStep = 0;
  updateUI();
});

prevBtn.addEventListener('click', () => {
  if (currentStep > 0) {
    currentStep--;
    updateUI();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    updateUI();
  }
});
})();
