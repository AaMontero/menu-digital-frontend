import { Component, Input } from '@angular/core';
import { MenuCreateFieldForm } from '../components/menu-create.field-form/menu-create-field-form.component';
import {
  ComponentGeneric,
  DoneListItem,
  FormConfig,
  FormPageGeneric,
  FormsGeneric,
  GroupingComponentGeneric,
  PageGenericComponent,
  PageGenericRequest,
} from '../../../core/models/interfaces/menu.interface';
import { Router } from '@angular/router';

import {
  checkboxInputBase,
  createDefaultGroupGeneric,
  dateInputBase,
  formComponentGenericToPagesForm,
  formPagesComponentGenericToListDoneList,
  numerInputBase,
  radioInputBase,
  selectInputBase,
  textInputBase,
} from '../../../core/mappers/menu.mappers';
import Notiflix from 'notiflix';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { DragDropEditComponent } from '../components/drag-drop-edit-grouping/drag-drop-edit-group.component';
import { CommonModule } from '@angular/common';
import { CAlert } from '../../../shared/domain/enum/messagfge';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-enterprises',
  imports: [
    MenuCreateFieldForm,
    DragDropEditComponent,
    CommonModule,
    FormsModule,
    DragDropModule,
  ],
  templateUrl: './admin-menu.component.html',
  styleUrl: './admin-menu.component.css',
  standalone: true,
})
export class AdminMenu {
  constructor(private readonly router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.itemRecibido = navigation.extras.state['item'];
      this.infoPageForm = navigation.extras.state['infoPageForm'];
      this.isEdit = navigation.extras.state['isEdit'];
      this.field = navigation.extras.state['field'];
      if (this.isEdit) {
        const { doneListRes, formDataList } =
          formPagesComponentGenericToListDoneList(this.field);
        this.listDoneLists = doneListRes;
        this.dataForms = formDataList;
        this.tabs = Array(this.listDoneLists.length).fill({
          title: '',
        });
        this.doneLists = this.listDoneLists[0] || [];
        this.selectedItem = this.dataForms[0] || new ComponentGeneric();
      }
    } else {
      this.itemRecibido = new FormsGeneric();
      this.isEdit = false;
      this.field = new PageGenericComponent();
      this.infoPageForm = new FormPageGeneric();
    }
  }
  private readonly BLOCK_SELECTOR = '.div-container';
  @Input() formConfig!: FormConfig;
  isEdit: boolean;
  tabs: any[] = [];
  selectedTab: number = 0;
  infoPageForm: FormPageGeneric;
  field: PageGenericComponent;
  groupSelected: GroupingComponentGeneric = new GroupingComponentGeneric();
  isEditGrouping: boolean = false;
  listDoneLists: DoneListItem[][] = [];
  doneLists: DoneListItem[] = [];
  dataForms: FormsGeneric[] = [];
  itemRecibido: FormsGeneric;
  
  isEditingComponent = false;
  selectedType = 'text';
  selectedItem: ComponentGeneric = new ComponentGeneric();
  selectedComponent: ComponentGeneric = new ComponentGeneric();
  availableString = ['checkbox', 'date', 'number', 'select', 'text', 'radio'];
  available: ComponentGeneric[] = [];
  visibilidadSecciones: boolean[] = [];
  selectedGroupIndex: number = -1;
  private readonly ICONOS_TIPO: Record<string, string> = {
    checkbox: 'check_box',
    date: 'event',
    number: 'pin',
    select: 'arrow_drop_down_circle',
    text: 'title',
    radio: 'radio_button_checked',
  };
  private readonly COLOR_GROUP_HEADER: Record<string, string> = {
    '#1E9CD5': 'color-azul',
    '#0D5580': 'color-oscuro',
    '#686868': 'color-gris',
  };
  private readonly BASE_COMPONENTES: Record<string, ComponentGeneric> = {
    text: textInputBase,
    number: numerInputBase,
    checkbox: checkboxInputBase,
    date: dateInputBase,
    select: selectInputBase,
    radio: radioInputBase,
  };
  private readonly defaultColorGroup = '#0D5580';
  private readonly defaultIcon: string = 'help_outline';
  getColorClass(color: string): string {
    return this.COLOR_GROUP_HEADER[color] || this.defaultColorGroup;
  }
  addTab() {
    this.tabs.push({ title: '' });
    const nuevoForm = new FormsGeneric();
    const nuevoDoneList: DoneListItem[] = [];
    this.dataForms.push(nuevoForm);
    this.listDoneLists.push(nuevoDoneList);
    this.doneLists = nuevoDoneList;
    this.selectedItem = nuevoForm;
    this.itemRecibido = nuevoForm;
    this.selectedTab = this.tabs.length - 1;
  }
  selectTab(index: number) {
    this.doneLists = this.listDoneLists[index];
    this.itemRecibido = this.dataForms[index];
    this.selectedTab = index;
  }

  ngOnInit(): void {
    this.available = this.availableString.map((type) =>
      this.getComponentBase(type)
    );
    if (this.tabs.length === 0) {
      this.addTab();
    }
    this.listDoneLists = [
      [
        // Primer grupo de DoneListItem[]
        {
          field: {
            id: 'group1',
            name: 'Grupo 1',
            descriptionGroup: 'Descripción del grupo 1',
            color: '#FF5733',
            columnsAmount: 2,
            opcionesSeleccionadas: ['op1', 'op2'],
            itemOrder: 1,
            isVisible: true,
            components: [], // O instancias de ComponentDto si lo tienes definido
          },
          items: [
            [
              // Primer grupo de ComponentGeneric[]
              {
                id: 'comp1',
                nameComponent: 'Nombre 1',
                label: 'Label 1',
                type: 'text',
                defaultValue: '',
                required: true,
                column: 0,
                row: 0,
                style: 'border: 1px solid #ccc',
                options: [{ label: 'Opción 1', value: 1 }],
              },
              {
                id: 'comp2',
                nameComponent: 'Nombre 2',
                label: 'Label 2',
                type: 'number',
                defaultValue: 10,
                required: false,
                column: 1,
                row: 0,
                style: 'color: blue',
              },
            ],
          ],
        },
      ],
    ];
  }

  getIcon(type: string): string {
    return this.ICONOS_TIPO[type] || this.defaultIcon;
  }

  getComponentBase(type: string): ComponentGeneric {
    const base = this.BASE_COMPONENTES[type];
    return base ? structuredClone(base) : new ComponentGeneric();
  }
  daClick() {
    console.log('Botón presionado');
    console.log(this.listDoneLists);
  }
  addGroup() {
    const newDoneList = createDefaultGroupGeneric(
      this.doneLists,
      this.defaultColorGroup
    );
    this.doneLists.push(newDoneList);
  }
  onColorUpdate(color: string) {
    const current = this.doneLists[this.selectedGroupIndex].field;
    this.doneLists[this.selectedGroupIndex].field = {
      ...current,
      color: color,
    };
  }

  onColumnsUpdate(columns: number) {
    const current = this.doneLists[this.selectedGroupIndex].field;
    const items = Array.from({ length: columns }, () => []);
    this.doneLists[this.selectedGroupIndex] = { items, field: current };
  }
  verGrupo(index: number) {
    this.doneLists[index].field.isVisible =
      !this.doneLists[index].field.isVisible;
  }
  trackItem(index: number, item: any): any {
    return item;
  }
  get doneListRefs(): string[] {
    const refs: string[] = [];
    this.doneLists.forEach((group, i) => {
      group.items.forEach((_, j) => {
        refs.push(`doneList_${i}_${j}`);
      });
    });
    return refs;
  }
  drop(event: CdkDragDrop<ComponentGeneric[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (event.previousContainer.id === 'cdk-drop-list-0') {
      const item = event.previousContainer.data[event.previousIndex];
      const copy = typeof item === 'object' ? structuredClone(item) : item;
      event.container.data.splice(event.currentIndex, 0, copy);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  datos: any[] = [];

  openEditComponent(item: ComponentGeneric) {
    this.selectedComponent = item;
    this.isEditingComponent = true;
    this.isEditGrouping = false;
  }
  openEditGroupingBool(group: DoneListItem) {
    this.isEditGrouping = true;
    this.isEditingComponent = false;
    this.groupSelected = group.field;
    this.selectedGroupIndex = this.doneLists.indexOf(group);
  }

  deleteGrouping(grouping: GroupingComponentGeneric, i: number): void {
    const confirmar = confirm(`¿Estás seguro de eliminar "${grouping.name}"?`);
    if (confirmar) {
      this.doneLists.splice(i, 1);
    }
  }

  getNombreCorto(index: number): string {
    const name = this.dataForms?.[index]?.name;
    if (!name) return '';
    return name.length > 10 ? name.slice(0, 10) + '...' : name;
  }

  deleteForm() {
    const confirmar = confirm(
      `¿Estás seguro de eliminar  la pagina: "${
        this.dataForms[this.selectedTab].name
      }"?`
    );
    if (confirmar) {
      this.listDoneLists.splice(this.selectedTab, 1);
      this.dataForms.splice(this.selectedTab, 1);
      this.tabs.splice(this.selectedTab, 1);
    }
  }

  // Llamado a las API de guardado y actualización
  async guardarFormulario() {
    try {
      Notiflix.Block.standard(
        this.BLOCK_SELECTOR,
        CAlert.PROCESANDO.getMessage()
      );

      if (this.isEdit) {
        if (!this.itemRecibido.id) {
          throw new Error('El id del formulario es undefined');
        }
        await this.updatePageFormComplete();
      } else {
        await this.savePageFormComplete();
        Notiflix.Notify.success('Formulario creado correctamente');
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Ocurrió un error inesperado';
      Notiflix.Notify.failure(`Error al guardar: ${message}`);
    } finally {
      Notiflix.Block.remove(this.BLOCK_SELECTOR);
    }
  }

  async savePageFormComplete() {
    const requestPageForm: PageGenericComponent =
      formComponentGenericToPagesForm(
        this.listDoneLists,
        this.dataForms,
        this.infoPageForm
      );
    await this.createFullPageForm(requestPageForm);
  }
  async updatePageFormComplete() {
    const requestPageForm: PageGenericComponent =
      formComponentGenericToPagesForm(
        this.listDoneLists,
        this.dataForms,
        this.infoPageForm
      );
    if (!this.infoPageForm.id) return;
    await this.updateFullPageForm(this.infoPageForm.id, requestPageForm);
  }
  async createFullPageForm(input: PageGenericComponent): Promise<void> {
    const dto: PageGenericRequest = new PageGenericRequest();
    dto.name = input.namePage;
    dto.description = input.descriptionPage;
    dto.type = input.typePage;
    dto.forms = input.forms || [];
  }
  async updateFullPageForm(
    id: string,
    input: PageGenericComponent
  ): Promise<void> {
    const dto: PageGenericRequest = new PageGenericRequest();
    dto.name = input.namePage;
    dto.description = input.descriptionPage;
    dto.type = input.typePage;
    dto.forms = input.forms || [];
    Notiflix.Notify.info('Guardando formulario...');
  }
}
