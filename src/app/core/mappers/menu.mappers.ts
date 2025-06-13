import {
  DoneListItem,
  FormPageGeneric,
  FormsGeneric,
  PagesForm,
  ComponentGeneric,
  FormComponentGeneric,
  GroupComponentGeneric,
  PageGenericComponent,
  GroupingComponentGeneric,
} from '../models/interfaces/menu.interface';

export function headerAndBodyToFormComponentGeneric(
  itemRecibido: FormsGeneric,
  doneList: DoneListItem[]
): FormComponentGeneric {
  const formRequest: FormComponentGeneric = new FormComponentGeneric();
  formRequest.id = itemRecibido.id;
  formRequest.name = itemRecibido.name;
  formRequest.description = itemRecibido.description;
  formRequest.groupingComponents = [];
  for (const doneItem of doneList) {
    const group = new GroupComponentGeneric();
    group.id = doneItem.field.id;
    group.name = doneItem.field.name;
    group.descriptionGroup = doneItem.field.descriptionGroup;
    group.typeGroup = 'GROUP';
    group.columnsAmount = doneItem.field.columnsAmount;
    group.isVisible = doneItem.field.isVisible ?? true;
    group.components = [];
    group.color = doneItem.field.color ?? '';
    doneItem.items.forEach((rowItems, colIndex) => {
      rowItems.forEach((component, rowIndex) => {
        const comp = new ComponentGeneric();
        comp.idCoverage = component.idCoverage;
        comp.nameComponent = component.nameComponent;
        comp.label = component.label;
        comp.type = component.type;
        comp.placeHolder = component.placeHolder;
        comp.toolTip = component.toolTip;
        comp.descriptionComponent = component.descriptionComponent ?? '';
        comp.codeRelationship = component.codeRelationship;
        comp.decimalsAmount = component.decimalsAmount;
        comp.required = component.required ?? true;
        comp.row = rowIndex;
        comp.column = colIndex;
        comp.defaultValue = component.defaultValue ?? '';
        comp.max = component.max ?? null;
        comp.min = component.min ?? null;
        comp.style = component.style ?? '';
        comp.regularExpression = component.regularExpression ?? '';
        comp.catalogCode = component.catalogCode ?? '';

        group.components?.push(comp);
      });
    });

    formRequest.groupingComponents.push(group);
  }
  return formRequest;
}

export function formComponentGenericToPagesForm(
  form: DoneListItem[][],
  formData: FormsGeneric[],
  pagesForm: FormPageGeneric
): PageGenericComponent {
  const pageForm = new PageGenericComponent();
  console.log('El pagesForm es:', pagesForm);
  pageForm.namePage = pagesForm.name;
  pageForm.descriptionPage = pagesForm.description;
  pageForm.typePage = pagesForm.type ?? '';
  const listForm: FormComponentGeneric[] = [];
  for (let i = 0; i < form.length; i++) {
    const generatedForm = headerAndBodyToFormComponentGeneric(
      formData[i],
      form[i]
    );
    console.log('Iteracion', i, 'del formData', generatedForm);
    listForm.push(generatedForm);
  }
  console.log('La lista final es:', listForm);
  pageForm.forms = listForm;
  return pageForm;
}

export function formPagesComponentGenericToListDoneList(
  pagesForm: PageGenericComponent
): { doneListRes: DoneListItem[][]; formDataList: FormsGeneric[] } {
  const doneList: DoneListItem[][] = [];
  if (!pagesForm.forms) return { doneListRes: doneList, formDataList: [] };
  const formDataList: FormsGeneric[] = [];
  pagesForm.forms.forEach((form) => {
    const formData = new FormsGeneric();
    formData.id = form.id;
    formData.name = form.name;
    formData.description = form.description;
    formDataList.push(formData);
  });
  const doneListRes: DoneListItem[][] = pagesForm.forms.map((form) =>
    formComponentGenericToDoneList(form)
  );
  console.log('En la transformación el form data es:', formDataList);
  return { doneListRes, formDataList };
}

export function formComponentGenericToDoneList(
  form: FormComponentGeneric
): DoneListItem[] {
  const doneList: DoneListItem[] = [];

  if (!form.groupingComponents) return doneList;

  form.groupingComponents.forEach((group, index) => {
    const components = group.components ?? [];
    const maxCol = Math.max(...components.map((c) => c.column ?? 0), 0);
    const matrix: ComponentGeneric[][] = Array.from(
      { length: maxCol + 1 },
      () => []
    );

    for (const comp of components) {
      const col = comp.column ?? 0;
      const row = comp.row ?? 0;

      while (matrix[col].length <= row) {
        matrix[col].push(undefined as any);
      }

      matrix[col][row] = comp;
    }

    const doneItem: DoneListItem = {
      field: {
        id: group.id,
        name: group.name,
        descriptionGroup: group.descriptionGroup,
        columnsAmount: group.columnsAmount,
        opcionesSeleccionadas: [],
        itemOrder: index,
        isVisible: group.isVisible ?? true,
        color: group.color ?? '',
      },
      items: matrix,
    };

    doneList.push(doneItem);
  });

  return doneList;
}
export const textInputBase: ComponentGeneric = {
  type: 'text',
  placeHolder: 'Ingrese el texto indicativo',
  toolTip: 'Texto Inicial',
  label: 'Etiqueta para el campo',
  nameComponent: 'Ingrese el nombre del componente',
};

export const numerInputBase: ComponentGeneric = {
  type: 'number',
  placeHolder: 'Ingrese el valor indicativo',
  toolTip: 'Ingrese el valor',
  label: 'Etiqueta para el campo numérico',
  nameComponent: 'Componente Numérico',
};

export const checkboxInputBase: ComponentGeneric = {
  type: 'checkbox',
  placeHolder: '',
  toolTip: 'Seleccionar opción',
  label: 'Opción de verificación',
  nameComponent: 'Componente Checkbox',
};

export const dateInputBase: ComponentGeneric = {
  type: 'date',
  placeHolder: 'Seleccione una fecha',
  toolTip: 'Fecha a seleccionar',
  label: 'Fecha',
  nameComponent: 'Componente de Fecha',
};

export const selectInputBase: ComponentGeneric = {
  type: 'select',
  placeHolder: 'Seleccione una opción',
  toolTip: 'Opciones disponibles',
  label: 'Lista desplegable',
  nameComponent: 'Componente Select',
};

export const radioInputBase: ComponentGeneric = {
  type: 'radio',
  placeHolder: '',
  toolTip: 'Seleccionar una opción',
  label: 'Opciones de radio',
  nameComponent: 'Componente Radio',
};

export function createDefaultGroupGeneric(
  doneLists: DoneListItem[],
  defaultColorGroup: string
): DoneListItem {
  const newField = new GroupingComponentGeneric();
  newField.id = `group_${doneLists.length + 1}`;
  newField.name = '';
  newField.descriptionGroup = '';
  newField.columnsAmount = 1;
  newField.opcionesSeleccionadas = [];
  newField.itemOrder = doneLists.length + 1;
  newField.isVisible = true;
  newField.color = defaultColorGroup;
  const newDoneList: DoneListItem = {
    items: Array.from({ length: 1 }, () => []),
    field: newField
  };
  return newDoneList;
}
