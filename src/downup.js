import { drawImported } from './raycast.js';

const template = {
  name: 'Test',
  exoplanet: '11 UMi b',
  stars: []
}

function downloadConstellation (stars, title) {
  const data = JSON.stringify({
    name: title ?? 'Constellation',
    exoplanet: template.exoplanet,
    stars
  });
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title ?? 'Constellation'}.json`;
  a.click();
  URL.revokeObjectURL(url);
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
      drawImported(data.name, data.stars);
    };
    reader.readAsText(file);
  };
  input.click();
}

export {
  downloadConstellation,
  uploadConstellation
}
