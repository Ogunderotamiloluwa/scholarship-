/**
 * Logging utility for consistent console output
 */
export function logSuccess(message) {
  console.log(`✅ ${message}`);
}

export function logError(message) {
  console.error(`❌ ${message}`);
}

export function logInfo(message) {
  console.log(`ℹ️  ${message}`);
}

export function logWarning(message) {
  console.warn(`⚠️  ${message}`);
}

export default {
  logSuccess,
  logError,
  logInfo,
  logWarning
};
