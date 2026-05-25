$rawDir = "D:\Teach\RAW DATA"
$targetDir = "D:\Teach\LMS-React\src\components\interactive"

$mappings = @(
    @{ source = "unit_4_1.tsx"; target = "pyUnit4_1_ControlFlow.jsx"; funcName = "pyUnit4_1_ControlFlow" },
    @{ source = "unit_4_2_input_print.tsx"; target = "pyUnit4_2_InputDemo.jsx"; funcName = "pyUnit4_2_InputDemo" },
    @{ source = "unit_4_3.tsx"; target = "pyUnit4_4_ArithmeticOps.jsx"; funcName = "pyUnit4_4_ArithmeticOps" },
    @{ source = "unit_4_4.tsx"; target = "pyUnit4_5_AssignmentOps.jsx"; funcName = "pyUnit4_5_AssignmentOps" },
    @{ source = "unit_4_6.tsx"; target = "pyUnit4_6_ComparisonOps.jsx"; funcName = "pyUnit4_6_ComparisonOps" },
    @{ source = "unit_4_7.tsx"; target = "pyUnit4_7_LogicalOps.jsx"; funcName = "pyUnit4_7_LogicalOps" },
    @{ source = "unit_4_8.tsx"; target = "pyUnit4_8_IdentityOps.jsx"; funcName = "pyUnit4_8_IdentityOps" },
    @{ source = "unit_4_9_membership.tsx"; target = "pyUnit4_9_MembershipOps.jsx"; funcName = "pyUnit4_9_MembershipOps" }
)

foreach ($m in $mappings) {
    $srcPath = Join-Path $rawDir $m.source
    $dstPath = Join-Path $targetDir $m.target
    
    $content = [System.IO.File]::ReadAllText($srcPath, [System.Text.Encoding]::UTF8)
    $content = $content.Replace("export default function App()", "export default function $($m.funcName)()")
    [System.IO.File]::WriteAllText($dstPath, $content, [System.Text.UTF8Encoding]::new($false))
    
    Write-Host "OK: $($m.source) -> $($m.target)"
}

Write-Host "`nAll 8 components replaced successfully!"
