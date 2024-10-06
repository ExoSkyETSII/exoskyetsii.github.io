import { clearLines } from './constellation.js';
import { drawImported } from './raycast.js';

// const template = {
//   name: 'Test',
//   exoplanet: '11 UMi b',
//   stars: []
// }

let uploaded = []

function downloadConstellation (stars, title) {
  const data = JSON.stringify({
    name: title ?? 'Constellation',
    exoplanet: '11 UMi b',
    stars
  });
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title ?? 'Constellation'}.json`;
  a.click();
  URL.revokeObjectURL(url);
  clearLines();
}

function uploadConstellation () {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = JSON.parse(event.target.result);

      if (uploaded.includes(data.name)) {
        return;
      }

      uploaded.push(data.name);
      drawImported(data);
    };
    reader.readAsText(file);
  };
  input.click();
}

export {
  downloadConstellation,
  uploadConstellation
}
