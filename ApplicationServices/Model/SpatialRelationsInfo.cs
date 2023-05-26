namespace ApplicationServices.Model
{
    public class SpatialRelationsInfo
    {
        public bool Intersecting { get; set; }
        public bool Inside { get; set; }

        protected bool Equals(SpatialRelationsInfo other)
        {
            return Intersecting == other.Intersecting && Inside == other.Inside;
        }

        public override bool Equals(object? obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != this.GetType()) return false;
            return Equals((SpatialRelationsInfo) obj);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Intersecting, Inside);
        }
    }
}
