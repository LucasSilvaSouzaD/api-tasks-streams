export function buildRoutePath(path) {
  const routeParametersReger = /:([a-zA-Z]+)/g
  const pathWithParams = path.replaceAll(routeParametersReger, '(?<$1>[a-z0-9\-_]+)')
  
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)
  return pathRegex
}