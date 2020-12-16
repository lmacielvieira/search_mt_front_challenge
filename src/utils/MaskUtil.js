import StringMask from 'string-mask'
import t from 'typy'

export const applyPhoneMask = (value) => {
  const mask = new StringMask('(##) #####-####')

  if (value) {
    value = value.replace(/\D/g, '')

    return mask.apply(value)
  }
  return value
}

export const normalizeInput = (value) => {
  return t(value)
    .safeString.toUpperCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export const applyCpfMask = (value) => {
  const max = 11
  const cpfMask = new StringMask('###.###.###-##')

  if (value) {
    value = value.replace(/\D/g, '')

    if (value && value.length > max) {
      value = value.substr(0, max)
    }
    return cpfMask.apply(value)
  }
  return value
}

export const applyCnpjMask = (value) => {
  const max = 14
  const cnpjMask = new StringMask('##.###.###/####-##')

  if (value) {
    value = value.replace(/\D/g, '')

    if (value && value.length > max) {
      value = value.substr(0, max)
    }

    return cnpjMask.apply(value)
  }
  return value
}

export const validateCPF = (strCPF) => {
  if (!strCPF) {
    return false
  }

  let digitosIguais = 1

  strCPF = strCPF.replace(/[\D]/g, '')

  if (strCPF.length < 11) return false

  for (let i = 0; i < strCPF.length - 1; i += 1)
    if (strCPF.charAt(i) !== strCPF.charAt(i + 1)) {
      digitosIguais = 0
      break
    }

  let Soma
  let Resto
  Soma = 0
  if (digitosIguais) return false

  for (let i = 1; i <= 9; i += 1)
    Soma += parseInt(strCPF.substring(i - 1, i), 10) * (11 - i)
  Resto = (Soma * 10) % 11

  if (Resto === 10 || Resto === 11) Resto = 0
  if (Resto !== parseInt(strCPF.substring(9, 10), 10)) return false

  Soma = 0
  for (let i = 1; i <= 10; i += 1)
    Soma += parseInt(strCPF.substring(i - 1, i), 10) * (12 - i)
  Resto = (Soma * 10) % 11

  if (Resto === 10 || Resto === 11) Resto = 0
  if (Resto !== parseInt(strCPF.substring(10, 11), 10)) return false
  return true
}

export const digit = (numbers) => {
  let index = 2

  const sum = [...numbers].reverse().reduce((buffer, number) => {
    buffer += Number(number) * index
    index = index === 9 ? 2 : index + 1
    return buffer
  }, 0)

  const mod = sum % 11

  return mod < 2 ? 0 : 11 - mod
}

export const validateCNPJ = (cnpj) => {
  if (!cnpj) {
    return false
  }

  // Remove period, slash and dash characters from CNPJ
  const cleaned = cnpj.toString().replace(/[./-]/g, '')

  if (
    // Must be defined
    !cleaned ||
    // Must have 14 characters
    cleaned.length !== 14 ||
    // Must be digits and not be sequential characters (e.g.: 11111111111111, etc)
    /^(\d)\1+$/.test(cleaned)
  ) {
    return false
  }

  let registration = cleaned.substr(0, 12)
  registration += digit(registration)
  registration += digit(registration)

  return registration.substr(-2) === cleaned.substr(-2)
}
