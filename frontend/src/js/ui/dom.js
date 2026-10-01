export const byId = (id) => document.getElementById(id);
export function text(id, value) {
  byId(id).textContent = String(value);
}
export function element(tag, className, content = '') {
  const node = document.createElement(tag);
  node.className = className;
  node.textContent = content;
  return node;
}
export function options(id, values) {
  byId(id).replaceChildren(
    ...Object.entries(values).map(([value, label]) => {
      const option = element('option', '', label);
      option.value = value;
      return option;
    }),
  );
}
export function metric(label, value) {
  const card = element('div', 'metric');
  card.append(element('span', 'muted', label), element('strong', '', value));
  return card;
}
