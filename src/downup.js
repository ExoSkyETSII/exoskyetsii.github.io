const template = {
  name: 'Test',
  exoplanet: '11 UMi b',
  stars: []
}

function downloadConstellation (stars, title) {
  const data = JSON.stringify({ ...template, stars });
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'constellation.json';
  a.click();
  URL.revokeObjectURL(url);
}

export {
  downloadConstellation
}
