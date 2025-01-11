export const iconColors = {
    'medecine-generale': 'grey',
    'depistage': 'red',
    'sante-sexuelle': 'orange',
    'soutien': 'green',
    'accompagnement-psychologique': 'aqua',
    'sortie-prostitution': 'blue',
    'preservatif': 'purple',
    'plainte': 'fuchsia',
    'droit-sante': 'orchid'
  };
  
  export const createIcon = (color) => {
    const svgIcon = `
      <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" r="10" stroke="black" stroke-width="2" fill="${color}" />
      </svg>
    `;
    return L.divIcon({
      className: 'custom-icon',
      html: svgIcon,
      iconSize: [30, 30],
      iconAnchor: [15, 30], // Center the icon
      popupAnchor: [0, -30] // Position the popup above the icon
    });
  };
  
  