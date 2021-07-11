import Tag                      from "../../Internals/Tag";
import DXFManager               from "../../Internals/DXFManager";

export const enum SplineFlags
{
    Closed   = 1  , // Closed spline.
    Periodic = 2  , // Periodic spline.
    Rational = 4  , // Rational spline.
    Planar   = 8  , // Planar
    Linear   = 16   //  Linear (planar bit is also set)
}

export const enum PolylineFlags
{
    Default         = 0  , // Default value.
    Closed          = 1  , // This is a closed polyline (or a polygon mesh closed in the M direction).
    CurveFit        = 2  , // Curve-fit vertices have been added.
    SplineFit       = 4  , // Spline-fit vertices have been added.
    Is3DPolyline    = 8  , // This is a 3D polyline.
    Is3DPolygonMesh = 16 , // This is a 3D polygon mesh.
    PolygonMesh     = 32 , // The polygon mesh is closed in the N direction.
    PolyfaceMesh    = 64 , // The polyline is a polyface mesh.
    Linetype        = 128  //  The linetype pattern is generated continuously around the vertices of this polyline.
}

export const enum VertexFlags
{

    ExtraVertex        = 1,  // Extra vertex created by curve-fitting.
    CurveFit           = 2,  // Curve-fit tangent defined for this vertex. A curve-fit tangent direction of 0 may be omitted from DXF output but is significant if this bit is set.
    NotUsed            = 4,  // Not used.
    SplineVertex       = 8,  // Spline vertex created by spline-fitting.
    SplineFrame        = 16, // Spline frame control point.
    Polyline3DVertex   = 32, // 3D polyline vertex.
    Polygon3DMesh      = 64, // 3D polygon mesh.
    PolyfaceMeshVertex = 128 // Polyface mesh vertex.
}

export default class Entity extends DXFManager
{
    get layerName      () : string { return this._layer_name;      }
    get subclassMarker () : string { return this._subclass_marker; }
    get type           () : string { return this._type;            }

    protected   readonly _type            : string;
    protected   readonly _subclass_marker : string;
    private     readonly _layer_name      : string;

    /**
     * Entity class is the base class of all enities.
     * 
     * @link http://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-7D07C886-FD1D-4A0C-A7AB-B4D21F18E484.
     * 
     * @param type {string} The type of the entity example : LINE, POLYLINE, ARC, CIRCLE ....
     * @param subclass 
     */
    public constructor(type : string, subclass_marker : string) {
        super();
        this._type          = type;
        this._subclass_marker  = subclass_marker;
        this._layer_name     = DXFManager.currentLayer;
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
    public tags() : Tag[]
    {
        return [
            ...this.makeEntityType(this._type),
            ...this.makeHandle(this.handle),
            ...this.makeSubclassMarker('AcDbEntity'),
            ...this.makeLayer(this._layer_name),
            ...this.makeSubclassMarker(this._subclass_marker)
        ];
    }
};
