export class PageGenericComponent {
    namePage?: string;
    descriptionPage?: string;
    typePage?: string;
    forms?: FormComponentGeneric[];
    constructor() {
    }
}
export class PageGenericRequest {
    name?: string;  
    description?: string; 
    type?: string; 
    forms?: FormComponentGeneric[];
        constructor() {
    }
}

export class FormComponentGeneric {
    id?: string;    
    name?: string;
    description?: string;
    typeForm?: string;
    groupingComponents?: GroupComponentGeneric[];
    constructor() {
    }
}
export class GroupComponentGeneric {
    id?: string; 
    name?: string;
    descriptionGroup?: string;
    typeGroup?: string;
    columnsAmount?: number;
    components?: ComponentGeneric[];
    isVisible?: boolean = true; 
    color?: string = '#1E9CD5'
    constructor() {
    }
}
export class ComponentGeneric {
    id?: string; 
    idCoverage?: string; 
    codeRelationship?: string;
    nameComponent?: string;
    label?: string;
    type?: string;
    defaultValue?: any;
    placeHolder?: string;
    required?: boolean;
    min?: number | null;
    minStartDate?: Date | null;
    minEndDate?: Date | null;
    maxStartDate?: Date | null;
    maxEndDate?: Date | null;
    max?: number | null;
    toolTip?: string | null;
    catDataTypeComponent?: string | null;
    decimalsAmount?: number | null;
    style?: string; // Se envia un objeto tipo estilo, por ejemplo: { border: '1px solid #ccc', 'border-radius': '6px', padding: '8px 12px', 'font-size': '14px', 'background-color': '#f9f9f9', color: '#333' }
    regularExpression?: string | null;
    rulesEngineflow?: Record<string, any>;
    catalogCode?: string | null;
    options?: { label: string; value: any }[];
    descriptionComponent?: string | null;
    multiple?: boolean;
    column?: number = -1; 
    row?: number = -1; 
    value?: any = null; 

    constructor() {
    }
}

export class dateType {
    date?: Date | null;
    startDate?: Date | null;
    endDate?: Date | null;
    constructor() {
    }
}	


export interface DoneListItem {
  items: ComponentGeneric[][];
  field: GroupingComponentGeneric;
}
export class GroupingComponentGeneric {
  id?: string;
  name?: string;
  descriptionGroup?: string;
  color?: string;
  columnsAmount?: number;
  opcionesSeleccionadas: string[] = [];
  itemOrder?: number = 1;
  isVisible?: boolean = true;
  components?: ComponentDto[] = [];
}



export class ComponentDto {
  idCoverage?: string;
}

export class FormsGeneric {
  id?: string;
  name?: string;
  description?: string;
  opcionesSeleccionadas?: string[] = [];
  groupingComponents?: GroupingDto[];
}
export class FormPageGeneric{
  id?: string;
  name?: string;
  description?: string;
  type?: string = "FORM";
}
export class GroupingDto {
  id?: string;
}
export interface DoneListItem {
  items: ComponentGeneric[][];
  field: GroupingComponentGeneric;
}
export interface PagesForm {
  id: string;
  name: string;
  description: string;
  itemStatus: number;
  type?: string;  
  forms?: FormsGeneric[];
}
export interface GraphqlMessage {
  code: string;
  description: string;
  details: string;
  timeStamp: string;
}
export interface FindAllFormPagesResponse {
  message: GraphqlMessage;
  data: PagesForm[];
}
export interface FindOneFormPageResponse {
  message: GraphqlMessage;
  data: PagesForm;
}
export interface FormConfig {
  title?: string;
  fields: FormFieldGeneric[];
  submitText?: string;
  style?: { [key: string]: string };
}
export interface FormFieldGeneric {
  type: 'text' | 'number' | 'email' | 'password' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'date';
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: any;
  options?: { value: any; label: string }[]; // Para select, radio
  validations?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    customMessage?: string;
    minDate?: string;
    maxDate?: string;
  };
  style?: { [key: string]: string };
  cols?: number; // Para textarea
  rows?: number; // Para textarea
  dateFormat?: string; // Formato de fecha
  minDate?: string;
  maxDate?: string;
}