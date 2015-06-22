export default function normalize(object, pattern = {}) {
  for (let key of Object.keys(object)) {
    if (object[key] === '') {
      delete object[key];
      continue;
    }

    if (object[key] === 'yes') {
      object[key] = true;
      continue;
    }

    if (object[key] === 'no') {
      object[key] = false;
      continue;
    }

    const split = object[key].split(',');
    if (split[0] !== object[key] || pattern[key] === 'list') {
      object[key] = split.map(a => a.trim());
      continue;
    }

    try {
      const o = JSON.parse(object[key]);
      object[key] = o;
    } catch(e) {
      continue;
    }
  }
}
