# Define the target structure according to APF
$targetStructure = @{
    "src" = @(
        "abstract",
        "interfaces",
        "models",
        "services",
        "tokens"
    )
    "src/lib" = @(
        "common",
        "context",
        "stores"
    )
    "src/test" = @(
        "unit",
        "integration"
    )
}

# Create the target directories
foreach ($dir in $targetStructure.Keys) {
    foreach ($subdir in $targetStructure[$dir]) {
        $path = Join-Path -Path $dir -ChildPath $subdir
        if (-not (Test-Path -Path $path)) {
            New-Item -ItemType Directory -Path $path
        }
    }
}

# Move files to the new structure
$filesToMove = @(
    "src/abstract/event-bus.ts",
    "src/interfaces/client-info.ts",
    "src/interfaces/cookie-options.ts",
    "src/interfaces/event-emitter.ts",
    "src/interfaces/event-reader.ts",
    "src/interfaces/internal-state.provider.ts",
    "src/interfaces/store.ts",
    "src/interfaces/translation.ts",
    "src/models/profile.token.model.ts",
    "src/models/profile.token.model.spec.ts",
    "src/services/common/client-callback.service.ts",
    "src/services/common/client-callback.service.spec.ts",
    "src/services/common/client-info.service.ts",
    "src/services/common/client-info.service.spec.ts",
    "src/services/common/client.module.ts",
    "src/services/common/client.module.spec.ts",
    "src/services/context/currency-bus.service.ts",
    "src/services/context/currency-event-emitter.ts",
    "src/services/context/currency-event-reader.ts",
    "src/services/context/language-bus.service.ts",
    "src/services/context/language-event-emitter.ts",
    "src/services/context/language-event-reader.ts",
    "src/services/context/language-translation.service.ts",
    "src/services/context/language-translation.service.spec.ts",
    "src/services/context/profile-bus.service.ts",
    "src/services/context/profile-bus.service.spec.ts",
    "src/services/context/profile-event-emitter.ts",
    "src/services/context/profile-event-reader.ts",
    "src/services/context/profile.service.ts",
    "src/services/profile-token-value.ts",
    "src/services/state-initializer.service.ts",
    "src/services/state-initializer.service.spec.ts",
    "src/services/state-saver.service.ts",
    "src/services/state-saver.service.spec.ts",
    "src/services/stores/cookie-store.ts",
    "src/services/stores/cookie-store.spec.ts",
    "src/services/stores/initiall-state.service.ts",
    "src/services/stores/initial-state.service.spec.ts",
    "src/services/stores/options-processor.ts",
    "src/services/stores/options-processor.spec.ts",
    "src/services/stores/profile-cookie-store.ts",
    "src/services/stores/profile-cookie-store.spec.ts",
    "src/services/stores/profile-ssr-store.ts",
    "src/services/stores/ssr-store.ts",
    "src/services/stores/state-comparison.service.ts",
    "src/services/stores/state-comparison.service.spec.ts",
    "src/services/string-bus.service.ts",
    "src/tokens/tokens.ts",
    "src/example.spec.ts"
)

foreach ($file in $filesToMove) {
    $sourcePath = Join-Path -Path $PSScriptRoot -ChildPath $file
    $destinationPath = $null

    if ($file -match "src/services/common/") {
        $destinationPath = Join-Path -Path $PSScriptRoot -ChildPath "src/lib/common/$(Split-Path -Leaf $file)"
    } elseif ($file -match "src/services/context/") {
        $destinationPath = Join-Path -Path $PSScriptRoot -ChildPath "src/lib/context/$(Split-Path -Leaf $file)"
    } elseif ($file -match "src/services/stores/") {
        $destinationPath = Join-Path -Path $PSScriptRoot -ChildPath "src/lib/stores/$(Split-Path -Leaf $file)"
    } elseif ($file -match "src/services/") {
        $destinationPath = Join-Path -Path $PSScriptRoot -ChildPath "src/services/$(Split-Path -Leaf $file)"
    } elseif ($file -match "src/models/") {
        $destinationPath = Join-Path -Path $PSScriptRoot -ChildPath "src/models/$(Split-Path -Leaf $file)"
    } elseif ($file -match "src/interfaces/") {
        $destinationPath = Join-Path -Path $PSScriptRoot -ChildPath "src/interfaces/$(Split-Path -Leaf $file)"
    } elseif ($file -match "src/abstract/") {
        $destinationPath = Join-Path -Path $PSScriptRoot -ChildPath "src/abstract/$(Split-Path -Leaf $file)"
    } elseif ($file -match "src/tokens/") {
        $destinationPath = Join-Path -Path $PSScriptRoot -ChildPath "src/tokens/$(Split-Path -Leaf $file)"
    } elseif ($file -match "src/example.spec.ts") {
        $destinationPath = Join-Path -Path $PSScriptRoot -ChildPath "src/test/unit/$(Split-Path -Leaf $file)"
    }

    if ($destinationPath -ne $null) {
        Move-Item -Path $sourcePath -Destination $destinationPath
    }
}

Write-Host "Files moved successfully according to APF structure."