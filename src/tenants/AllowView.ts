import { Tenants } from ".";
import { Profile } from "./profile";

type Props = {
	allowedProfiles: Profile[];
	allowedTenants: Tenants[];
	profile: Profile;
	tenant: Tenants;
};

const AllowView = ({ allowedProfiles, allowedTenants, profile, tenant }: Props) =>
	allowedProfiles.includes(profile) && allowedTenants.includes(tenant);

export default AllowView;
