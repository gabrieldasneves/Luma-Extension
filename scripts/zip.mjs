import { execSync } from 'child_process'
import { existsSync, rmSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const out = resolve(root, 'luma-extension.zip')

if (!existsSync(dist)) {
  console.error('  ✗  dist/ not found — run the build first')
  process.exit(1)
}

if (existsSync(out)) rmSync(out)
execSync(`cd "${dist}" && zip -r "${out}" .`, { stdio: 'inherit' })
console.log(`\n  ✓  luma-extension.zip ready for Chrome Web Store upload\n`)
