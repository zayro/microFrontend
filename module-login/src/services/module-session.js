export const moduleDestinations = {
  hv: { path: '/web/frontHv/', storageKey: 'conf_hv' },
  firma: { path: '/web/frontfirma/', storageKey: 'conf' },
}

export function openModule(module, response, username) {
  const destination = moduleDestinations[module]
  const data = response?.data ?? response
  const token = data?.token ?? data?.access_token

  if (!destination || typeof token !== 'string' || !token.trim()) {
    throw new Error('No se recibió una sesión válida. Intenta ingresar nuevamente.')
  }

  const user = data.user?.value ?? data.user ?? data.usuario ?? data.result?.[0] ?? data
  localStorage.setItem(destination.storageKey, JSON.stringify({
    conf: data.conf ?? {},
    token,
    user: { value: {
      username: user.username ?? user.nroidentificacion ?? username,
      identificacion: user.identificacion ?? user.nroidentificacion,
      email: user.email,
      nombrecompleto: user.nombrecompleto ?? user.username ?? username,
      idlpempleado: user.idlpempleado,
    } },
  }))
  window.location.assign(destination.path)
}
