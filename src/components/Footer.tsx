export function FOOTER() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 border-t botder-gray-700 py-3">
      <div className="container-app">
        <p className="text-sm text-gray-400 text-center">
          
            <p>
              <strong>MyBills</strong> {currentYear} - Desenvolvido por <strong>Marcus Dias</strong>.              
            </p>
            <span>Política de Privacidade. Todos os direitos reservados.</span>
          
          
          
        </p>
      </div>
    </footer>
  );
}
