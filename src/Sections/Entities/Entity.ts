import DXFManager from '../../Internals/DXFManager';
import Handle from '../../Internals/Handle';
import DxfInterface from '../../Internals/Interfaces/DXFInterface';
import TagsManager from '../../Internals/TagsManager';

export const enum SplineFlags {
	Closed = 1, // Closed spline.
	Periodic = 2, // Periodic spline.
	Rational = 4, // Rational spline.
	Planar = 8, // Planar
	Linear = 16, //  Linear (planar bit is also set)
}

export const enum PolylineFlags {
	Default = 0, // Default value.
	Closed = 1, // This is a closed polyline (or a polygon mesh closed in the M direction).
	CurveFit = 2, // Curve-fit vertices have been added.
	SplineFit = 4, // Spline-fit vertices have been added.
	Is3DPolyline = 8, // This is a 3D polyline.
	Is3DPolygonMesh = 16, // This is a 3D polygon mesh.
	PolygonMesh = 32, // The polygon mesh is closed in the N direction.
	PolyfaceMesh = 64, // The polyline is a polyface mesh.
	Linetype = 128, //  The linetype pattern is generated continuously around the vertices of this polyline.
}

export const enum VertexFlags {
	ExtraVertex = 1, // Extra vertex created by curve-fitting.
	CurveFit = 2, // Curve-fit tangent defined for this vertex. A curve-fit tangent direction of 0 may be omitted from DXF output but is significant if this bit is set.
	NotUsed = 4, // Not used.
	SplineVertex = 8, // Spline vertex created by spline-fitting.
	SplineFrame = 16, // Spline frame control point.
	Polyline3DVertex = 32, // 3D polyline vertex.
	Polygon3DMesh = 64, // 3D polygon mesh.
	PolyfaceMeshVertex = 128, // Polyface mesh vertex.
}

export default class Entity extends Handle implements DxfInterface {
	protected readonly _type: string;
	protected readonly _subclassMarker: string | null;
	private readonly _layerName: string;

	public get layerName(): string {
		return this._layerName;
	}

	public get subclassMarker(): string | null {
		return this._subclassMarker;
	}

	public get type(): string {
		return this._type;
	}

	/**
	 * Entity class is the base class of all enities.
	 *
	 * @link http://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-7D07C886-FD1D-4A0C-A7AB-B4D21F18E484.
	 *
	 * @param type {string} The type of the entity example : LINE, POLYLINE, ARC, CIRCLE ....
	 * @param subclass
	 */
	public constructor(type: string, subclassMarker: string | null = null) {
		super();
		this._type = type;
		this._subclassMarker = subclassMarker;
		this._layerName = DXFManager.currentLayer;
	}

	/**
	 * get the boundingBox of an entity
	 * @returns {number[][]}
	 */
	public boundingBox(): number[][] {
		return [];
	}

	/**
	 * get the array tags of the entity.
	 *
	 * @returns {Tag[]} Array of Tag.
	 */
	public get manager(): TagsManager {
		const manager = new TagsManager();
		manager.entityType(this._type);
		manager.handle(this.handle);
		manager.subclassMarker('AcDbEntity');
		if (!isNaN(DXFManager.currentTrueColor))
			manager.addTag(420, DXFManager.currentTrueColor);
		manager.layerName(this.layerName);
		if (this.subclassMarker) manager.subclassMarker(this.subclassMarker);
		return manager;
	}

	public stringify(): string {
		return this.manager.stringify();
	}
}
