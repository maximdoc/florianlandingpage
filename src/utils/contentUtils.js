import content from '../data/content.json';

/**
 * Получает глобальные настройки сайта
 * @returns {Object} Глобальные настройки сайта
 */
export const getGlobalSettings = () => content.global;

/**
 * Получает данные страницы по ID
 * @param {string} pageId - ID страницы
 * @returns {Object|null} Данные страницы или null, если страница не найдена
 */
export const getPageById = (pageId) => {
  return content.pages.find(page => page.id === pageId) || null;
};

/**
 * Получает данные страницы по slug
 * @param {string} slug - Slug страницы
 * @returns {Object|null} Данные страницы или null, если страница не найдена
 */
export const getPageBySlug = (slug) => {
  return content.pages.find(page => page.slug === slug) || null;
};

/**
 * Получает секцию страницы по ID
 * @param {string} pageId - ID страницы
 * @param {string} sectionId - ID секции
 * @returns {Object|null} Данные секции или null, если секция не найдена
 */
export const getSectionById = (pageId, sectionId) => {
  const page = getPageById(pageId);
  if (!page) return null;
  
  return page.sections.find(section => section.id === sectionId) || null;
};

/**
 * Получает все секции страницы
 * @param {string} pageId - ID страницы
 * @returns {Array} Массив секций страницы или пустой массив, если страница не найдена
 */
export const getAllSections = (pageId) => {
  const page = getPageById(pageId);
  if (!page) return [];
  
  return page.sections;
};

/**
 * Получает все секции определенного типа для страницы
 * @param {string} pageId - ID страницы
 * @param {string} sectionType - Тип секции
 * @returns {Array} Массив секций указанного типа или пустой массив
 */
export const getSectionsByType = (pageId, sectionType) => {
  const page = getPageById(pageId);
  if (!page) return [];
  
  return page.sections.filter(section => section.type === sectionType);
};

/**
 * Получает все страницы
 * @returns {Array} Массив всех страниц
 */
export const getAllPages = () => content.pages; 