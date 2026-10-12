(() => {
const arrayInput = document.getElementById('array-input');
const generateBtn = document.getElementById('generate-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const stepCounter = document.getElementById('step-counter');
const treeContainer = document.getElementById('tree-container');
const explanation = document.getElementById('explanation');
const speedSelect = document.getElementById('speed-select');

let originalArray = [];
let steps = [];
let currentStep = 0;
let playInterval = null;

// Utility to create element boxes
function createBox(value, state) {
  const div = document.createElement('div');
  div.className = 'array-box';
  div.textContent = value;
  if (state) div.dataset.state = state;
  return div;
}

// Recursive node creation
function createNode(subarray, depth = 0) {
  const node = document.createElement('div');
  node.className = 'tree-node';
  node.dataset.depth = depth;
  const header = document.createElement('div');
  header.className = 'node-header';
  subarray.forEach(v => header.appendChild(createBox(v)));
  node.appendChild(header);
  if (subarray.length > 1) {
    const mid = Math.floor(subarray.length / 2);
    const left = subarray.slice(0, mid);
    const right = subarray.slice(mid);
    const children = document.createElement('div');
    children.className = 'node-children';
    children.appendChild(createNode(left, depth + 1));
    children.appendChild(createNode(right, depth + 1));
    node.appendChild(children);
  }
  return node;
}

// Build full tree
function buildTree(arr) {
  treeContainer.innerHTML = '';
  const root = createNode(arr);
  treeContainer.appendChild(root);
}

// Generate steps for animation
function generateSteps(arr) {
  const steps = [];
  // Step 0: original
  steps.push({
    type: 'original',
    array: arr.slice(),
    explanation: `Original array: [${arr.join(', ')}]`
  });
  // Splitting steps
  function splitRec(sub, path) {
    if (sub.length <= 1) return;
    const mid = Math.floor(sub.length / 2);
    const left = sub.slice(0, mid);
    const right = sub.slice(mid);
    steps.push({
      type: 'split',
      path: path,
      left: left,
      right: right,
      explanation: `Split [${sub.join(', ')}] into [${left.join(', ')}] and [${right.join(', ')}]`
    });
    splitRec(left, path.concat('left'));
    splitRec(right, path.concat('right'));
  }
  splitRec(arr, []);
  // Merging steps
  function mergeRec(sub, path) {
    if (sub.length <= 1) return;
    const mid = Math.floor(sub.length / 2);
    const left = sub.slice(0, mid);
    const right = sub.slice(mid);
    mergeRec(left, path.concat('left'));
    mergeRec(right, path.concat('right'));
    const merged = [...left, ...right].sort((a,b)=>a-b);
    steps.push({
      type: 'merge',
      path: path,
      left: left,
      right: right,
      merged: merged,
      explanation: `Merge [${left.join(', ')}] and [${right.join(', ')}] into [${merged.join(', ')}]`
    });
  }
  mergeRec(arr, []);
  return steps;
}

function updateUI() {
  const step = steps[currentStep];
  explanation.textContent = step.explanation;
  stepCounter.textContent = `Step ${currentStep} / ${steps.length - 1}`;
  prevBtn.disabled = currentStep === 0;
  nextBtn.disabled = currentStep === steps.length - 1;
  playBtn.disabled = currentStep === steps.length - 1;
  resetBtn.disabled = currentStep === 0;
  // Highlight nodes
  const nodes = treeContainer.querySelectorAll('.tree-node');
  nodes.forEach(node => node.classList.remove('highlight'));
  if (step.type === 'split' || step.type === 'merge') {
    const path = step.path || [];
    let target = treeContainer.querySelector('.tree-node');
    path.forEach(p => {
      target = target.querySelector(`.node-children > .tree-node:nth-child(${p === 'left' ? 1 : 2})`);
    });
    if (target) target.classList.add('highlight');
  }
}

generateBtn.addEventListener('click', () => {
  const raw = arrayInput.value.split(',').map(s => s.trim()).filter(Boolean);
  const nums = raw.map(Number);
  if (raw.length !== nums.length || nums.some(isNaN)) {
    alert('Please enter a valid list of numbers separated by commas.');
    return;
  }
  originalArray = nums;
  buildTree(originalArray);
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

playBtn.addEventListener('click', () => {
  const speed = parseInt(speedSelect.value);
  playInterval = setInterval(() => {
    if (currentStep < steps.length - 1) {
      currentStep++;
      updateUI();
    } else {
      clearInterval(playInterval);
    }
  }, speed);
  playBtn.disabled = true;
  pauseBtn.disabled = false;
});

pauseBtn.addEventListener('click', () => {
  clearInterval(playInterval);
  playBtn.disabled = false;
  pauseBtn.disabled = true;
});

resetBtn.addEventListener('click', () => {
  currentStep = 0;
  updateUI();
});
})();
