import { Profile, Tenants } from 'lego';

type Props = {
	allowedProfiles: Profile[];
	allowedTenants: Tenants[];
	profiles: Profile[];
	tenant: Tenants;
};

const AllowView = ({ allowedProfiles, allowedTenants, profiles, tenant }: Props) =>
	allowedProfiles.some((allowed) => profiles.some((profile) => profile === allowed)) && allowedTenants.includes(tenant);

export default AllowView;
