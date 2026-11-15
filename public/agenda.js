/* Agenda da Pertto: pop-up do Calendly nos botões "Agendar reunião" e botão flutuante da agenda, em todas as páginas. */
(function(){
  var URL='https://calendly.com/pertto/faleconosco?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=6d2bd8';
  // Carrega o visual e o script do Calendly se a página ainda não os tiver.
  if(!document.querySelector('link[href*="calendly.com/assets/external/widget.css"]')){
    var l=document.createElement('link'); l.rel='stylesheet'; l.href='https://assets.calendly.com/assets/external/widget.css'; document.head.appendChild(l);
  }
  if(!document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')){
    var s=document.createElement('script'); s.src='https://assets.calendly.com/assets/external/widget.js'; s.async=true; document.head.appendChild(s);
  }
  // Botões com data-calendly: abrem o pop-up. Sem o Calendly carregado, o link abre a agenda em nova aba.
  Array.prototype.forEach.call(document.querySelectorAll('[data-calendly]'),function(a){
    a.addEventListener('click',function(e){
      if(window.Calendly && Calendly.initPopupWidget){
        e.preventDefault();
        Calendly.initPopupWidget({url:URL,text:'Agende um horário comigo',color:'#6d2bd9',textColor:'#ffffff',branding:false});
      }
    });
  });
  // Botão flutuante no canto da tela. Espera o Calendly carregar (até 15 s) e cria uma única vez.
  var tries=0, t=setInterval(function(){
    if(window.Calendly && Calendly.initBadgeWidget){
      clearInterval(t);
      Calendly.initBadgeWidget({url:URL,text:'Abrir a agenda de horários',color:'#6d2bd8',textColor:'#ffffff',branding:false});
    } else if(++tries>50){ clearInterval(t) }
  },300);
})();
