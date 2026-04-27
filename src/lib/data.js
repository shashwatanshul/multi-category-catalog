import data from '@/data/data.json';

export function getAllItems() {
  return data.map((item, index) => ({
    ...item,
    id: index, // fallback index
    slug: slugify(item.itemname)
  }));
}

export function getCategories() {
  const items = getAllItems();
  const categories = [...new Set(items.map(item => item.category))];
  return categories.map(cat => ({
    name: cat,
    items: items.filter(item => item.category === cat)
  }));
}

export function getItemBySlug(slug) {
  const items = getAllItems();
  return items.find(item => item.slug === slug);
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')  // Remove all non-word chars
    .replace(/--+/g, '-');    // Replace multiple - with single -
}
