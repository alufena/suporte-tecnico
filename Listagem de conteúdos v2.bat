@echo off
chcp 65001 > nul
echo Listando arquivos...

REM Cria uma lista de arquivos ignorando node_modules, .git, etc.
dir /s /b /a-d > estrutura_arquivos.txt

REM Remove linhas com caminhos que contenham palavras ignoradas
findstr /v /i "node_modules .git package-lock.json public conteudo_arquivos.txt estrutura_arquivos.txt" estrutura_arquivos.txt > arquivos_filtrados.txt

echo Salvando conteúdo dos arquivos em conteudo_arquivos.txt...

(
    for /f "usebackq delims=" %%A in ("arquivos_filtrados.txt") do (
        echo ====== %%A ======
        type "%%A"
        echo.
    )
) > conteudo_arquivos.txt

echo Concluído! Verifique conteudo_arquivos.txt.
pause
