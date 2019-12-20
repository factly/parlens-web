import { TypeMinistries } from '../../types';

const initialState: TypeMinistries = {
  1: ['AGRICULTURE AND FARMERS WELFARE', 'CHEMICALS AND FERTILIZERS'],
  2: ['CULTURE'],
  3: ['COMMERCE AND INDUSTRY', 'CORPORATE AFFAIRS'],
  4: ['COAL', 'MINES', 'STEEL'],
  5: ['PARLIAMENTARY AFFAIRS'],
  6: ['DRINKING WATER AND SANITATION'],
  7: [
    'COMMUNICATIONS',
    'COMMUNICATIONS AND INFORMATION TECHNOLOGY',
    'ELECTRONICS AND INFORMATION TECHNOLOGY'
  ],
  8: ['DEFENCE'],
  9: ['CORPORATE AFFAIRS', 'STATISTICS AND PROGRAMME IMPLEMENTATION'],
  10: [
    'HUMAN RESOURCE DEVELOPMENT',
    'SKILL DEVELOPMENT AND ENTREPRENEURSHIP',
    'YOUTH AFFAIRS AND SPORTS'
  ],
  11: ['ENVIRONMENT,  FORESTS AND CLIMATE CHANGE'],
  12: ['WATER RESOURCES, RIVER DEVELOPMENT AND GANGA REJUVENATION'],
  13: ['FINANCE'],
  14: [
    'CONSUMER AFFAIRS, FOOD AND PUBLIC DISTRIBUTION',
    'FOOD PROCESSING INDUSTRIES'
  ],
  15: ['EXTERNAL AFFAIRS', 'OVERSEAS INDIAN AFFAIRS'],
  16: ['HOME AFFAIRS', 'LAW AND JUSTICE'],
  17: [
    'AYURVEDA,YOGA AND NATUROPATHY,UNANI,SIDDHA AND HOMEOPATHY (AYUSH)',
    'HEALTH AND FAMILY WELFARE',
    'WOMEN AND CHILD DEVELOPMENT'
  ],
  18: [
    'HOME AFFAIRS',
    'LAW AND JUSTICE',
    'PERSONNEL, PUBLIC GRIEVANCES AND PENSIONS',
    'PLANNNING'
  ],
  19: ['HOUSING AND URBAN POVERTY ALLEVIATION'],
  20: [
    'HEAVY INDUSTRIES AND PUBLIC ENTERPRISES',
    'COMMERCE AND INDUSTRY',
    'FOOD PROCESSING INDUSTRIES',
    'MICRO, SMALL AND MEDIUM ENTERPRISES'
  ],
  21: ['INFORMATION AND BROACASTING'],
  22: ['ROAD TRANSPORT AND HIGHWAYS', 'SHIPPING', 'STEEL'],
  23: ['HOUSING AND URBAN POVERTY ALLEVIATION', 'URBAN DEVELOPMENT'],
  24: ['LABOUR AND EMPLOYMENT', 'TEXTILES'],
  25: [
    'COAL',
    'NEW AND RENEWABLE ENERGY',
    'PETROLEUM AND NATURAL GAS',
    'POWER'
  ],
  26: ['PANCHAYATI RAJ', 'RURAL DEVELOPMENT'],
  27: ['ATOMIC ENERGY', 'EARTH SCIENCES', 'SPACE', 'SCIENCE AND TECHNOLOGY'],
  28: [
    'DEVELOPMENT OF NORTH EASTERN REGION',
    'MINORITY AFFFAIRS',
    'SOCIAL JUSTICE AND EMPOWERMENT',
    'TRIBAL AFFAIRS'
  ],
  29: ['CIVIL AVIATION', 'RAILWAYS', 'ROAD TRANSPORT AND HIGHWAYS', 'SHIPPING'],
  30: ['TOURISM'],
  31: ['YOUTH AFFAIRS AND SPORTS'],
  32: ['YOUTH AFFAIRS AND SPORTS'],
  33: ['WOMEN AND CHILD DEVELOPMENT']
};

function filters(state = initialState, action: { type: string }) {
  switch (action.type) {
    default:
      return state;
  }
}

export default filters;