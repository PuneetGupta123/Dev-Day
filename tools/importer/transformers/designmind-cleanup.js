/* global WebImporter */

/**
 * Transformer for Design Mind website cleanup
 * Purpose: Remove Framer-specific elements and widgets
 * Applies to: www.wearedesignmind.com (all pages)
 * Generated: 2026-01-08
 *
 * SELECTORS EXTRACTED FROM:
 * - Captured DOM during migration workflow
 * - cleaned.html analysis
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform',
};

export default function transform(hookName, element) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove Framer overlay and editor elements
    // EXTRACTED: Found in captured DOM <div id="overlay">, <div id="__framer-editorbar">
    WebImporter.DOMUtils.remove(element, [
      '#overlay',
      '#__framer-editorbar',
      '#svg-templates',
    ]);

    // Remove hidden elements
    // EXTRACTED: Found class pattern hidden-* in captured DOM
    const hiddenElements = element.querySelectorAll('[class*="hidden-"]');
    hiddenElements.forEach((el) => el.remove());

    // Re-enable scrolling if blocked
    if (element.style.overflow === 'hidden') {
      element.setAttribute('style', 'overflow: scroll;');
    }
  }

  if (hookName === TransformHook.afterTransform) {
    // Clean up tracking and event attributes
    const allElements = element.querySelectorAll('*');
    allElements.forEach((el) => {
      el.removeAttribute('data-framer-name');
      el.removeAttribute('data-framer-page-optimized-for');
      el.removeAttribute('onclick');
    });

    // Remove remaining unwanted elements
    WebImporter.DOMUtils.remove(element, [
      'iframe',
      'link',
      'noscript',
      'source',
    ]);
  }
}
