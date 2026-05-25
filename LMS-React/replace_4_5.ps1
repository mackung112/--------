$rawDir = "D:\Teach\RAW DATA"
$targetDir = "D:\Teach\LMS-React\src\components\interactive"

$srcPath = Join-Path $rawDir "unit_4_5.tsx"
$dstPath = Join-Path $targetDir "pyUnit4_5b_OperatorPrecedence.jsx"

$content = [System.IO.File]::ReadAllText($srcPath, [System.Text.Encoding]::UTF8)
$content = $content.Replace("export default function App()", "export default function pyUnit4_5b_OperatorPrecedence()")
[System.IO.File]::WriteAllText($dstPath, $content, [System.Text.UTF8Encoding]::new($false))

Write-Host "OK: unit_4_5.tsx -> pyUnit4_5b_OperatorPrecedence.jsx"
