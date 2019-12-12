/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Based on Nvidia Cg tutorial
 */

THREE.FresnelShader = {

	uniforms: {

		"mRefractionRatio": { value: 0 },
		"mFresnelBias": { value: 0 },
		"mFresnelPower": { value: 0 },
		"mFresnelScale": { value: 0 },
		"tCube": { value: null }

	},

	vertexShader: [

		"uniform float mRefractionRatio;",
		"uniform float mFresnelBias;",
		"uniform float mFresnelScale;",
		"uniform float mFresnelPower;",

		"varying vec3 vReflect;",
		"varying vec3 vRefract[3];",
		"varying float vReflectionFactor;",

		"void main() {",

		"	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
		"	vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",

		"	vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );",

		"	vec3 I = worldPosition.xyz - cameraPosition;",

		"	vReflect = reflect( I, worldNormal );",
		"	vRefract[0] = refract( normalize( I ), worldNormal, mRefractionRatio );",
		"	vRefract[1] = refract( normalize( I ), worldNormal, mRefractionRatio * 0.99 );",
		"	vRefract[2] = refract( normalize( I ), worldNormal, mRefractionRatio * 0.98 );",
		"	vReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), mFresnelPower );",

		"	gl_Position = projectionMatrix * mvPosition;",

		"}"

	].join( "\n" ),

	fragmentShader: [
		"uniform samplerCube tCube;",

		"varying vec3 vReflect;",
		"varying vec3 vRefract[3];",
		"varying float vReflectionFactor;",

		"void main() {",

		"	vec4 reflectedColor = textureCube( tCube, vec3( vReflect.x, vReflect.y, vReflect.z ) );",
		"	vec4 refractedColor = vec4( 1.0 );",

		"	refractedColor.r = textureCube( tCube, vec3( vRefract[0].x, -vRefract[0].y, vRefract[0].z ) ).r;",
		"	refractedColor.g = textureCube( tCube, vec3( vRefract[1].x, -vRefract[1].y, vRefract[1].z ) ).g;",
		"	refractedColor.b = textureCube( tCube, vec3( vRefract[2].x, -vRefract[2].y, vRefract[2].z ) ).b;",

		"	gl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );",

		"}"

	].join( "\n" )

};
