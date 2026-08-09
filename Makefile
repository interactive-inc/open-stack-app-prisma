update:
	bunx npm-check-updates -u
	vp install

update-shadcn-ui:
	bunx --bun shadcn@latest add -a -o -y
	bunx --bun shadcn@latest migrate radix -y
