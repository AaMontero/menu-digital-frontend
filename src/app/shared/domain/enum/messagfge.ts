export class CMessage {
  private constructor(private code: string, private description: string) {}

  public static readonly OK = new CMessage('000', 'OK');
  public static readonly CREADO_EXITOSAMENTE = new CMessage(
    'M200',
    'Creado exitosamente'
  );
  public static readonly ACTUALIZADO_EXITOSAMENTE = new CMessage(
    'M201',
    'Actualizado exitosamente'
  );

  public getMessage(): string {
    return this.description;
  }

  public getCode(): string {
    return this.code;
  }
}

export class CAlert {
  private constructor(private code: string, private description: string) {}

  public static readonly PROCESANDO = new CAlert('A001', 'Procesando...');

  public static readonly ASIGNANDO = new CAlert('A002', 'Asignando');

  public static readonly CANCELADO = new CAlert('A003', 'Cancelado');

  public static readonly CARGANDO = new CAlert('A001', 'Cargando...');
  public static readonly ARCHIVO_NO_SELECCIONADO = new CAlert('A004', 'Archivo no seleccionado');

  public getMessage(): string {
    return this.description;
  }
  public getCode(): string {
    return this.code;
  }
}

export class CError {
  private constructor(private code: string, private description: string) {}
  public static readonly SOLICITUD_CON_PARAMETROS_INVALIDOS = new CError(
    'E400',
    'Solicitud con parámetros inválidos'
  );
  public static readonly ACCESO_NO_AUTORIZADO = new CError(
    'E401',
    'Acceso no autorizado'
  );
  public static readonly SIN_PERMISOS_PARA_REALIZAR_ESTA_ACCION = new CError(
    'E403',
    'No tienes permiso para realizar esta acción'
  );
  public static readonly RECURSO_NO_ENCONTRADO = new CError(
    'E404',
    'Recurso no encontrado'
  );
  public static readonly HA_OCURRIDO_UN_ERROR_INESPERADO = new CError(
    'E500',
    'Ocurrió un error inesperado en el sistema'
  );

  public static readonly NO_SE_PUDO_COMLETAR_LA_ACCION = new CError(
    'E501',
    'No se pudo completar la acción'
  );

  public static readonly SIN_RESULTADOS = new CError(
  'E204',
  'La búsqueda no devolvió resultados'
);
  public getMessage(): string {
    return this.description;
  }
  public getCode(): string {
    return this.code;
  }
}
